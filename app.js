var express = require("express");
var session = require("express-session");
var mysql = require("mysql");
const fileUpload = require("express-fileupload");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const uniqueString = require("unique-string");

var app = express();

app.use(session({ secret: "ssshhhhh!" }));

app.use(fileUpload());

app.locals.baseUrl = "http://localhost:3000";

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const bcrypt = require("bcryptjs");

var pwHash = (pwd) => {
  return bcrypt.hashSync(pwd, 10);
};

var pwVerify = (pwd, hash) => {
  if (bcrypt.compareSync(pwd, hash)) {
    return true;
  } else {
    return false;
  }
};

//static folder
app.use(express.static("static"));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory_database",
});

connection.connect(function (err) {
  if (err) {
    console.log("Cannot connect to mysql...");
    throw err;
  }
  console.log("Connected to mysql...");
});

//set view engine to ejs
app.set("view engine", "ejs");

// homepage
app.get("/", function (req, res) {
  res.locals.user = req.session.user;

  connection.query("SELECT * from products", function (error, results, fields) {
    if (error) throw error;
    res.render("index", {
      title: "Our Ice Creams",
      products: results,
    });
  });
});
//login
app.get("/login", function (req, res) {
  res.render("login", { title: "Login" });
});
app.post("/login", function (req, res) {
  console.log(req.body);
  let usr = req.body;
  // res.render('login', {title: "Failed! Try again", failed: true});

  connection.query(
    `SELECT * from customers where username="${usr.uname}"`,
    function (err, rows, fields) {
      if (!err) {
        console.log("The solution is: ", rows[0]);

        if (
          typeof rows[0] != "undefined" &&
          pwVerify(usr.pwd, rows[0].password)
        ) {
          console.log("Successful Login");
          req.session.user = {
            id: rows[0].id,
            username: rows[0].username,
          };
          res.redirect("/");
        } else {
          res.render("login", { title: "Failed! Try again", failed: true });
        }
      } else throw err;
    }
  );
});

//register
app.get("/register", function (req, res) {
  res.render("register", { title: "Register" });
});
//register post
app.post("/register", function (req, res) {
  console.log(req.body);
  let usr = req.body;
  let pwwd = pwHash(usr.pwd);
  connection.query(
    `SELECT * from customers where username="${usr.uname}"`,
    function (err, rows, fields) {
      if (rows.length <= 0) {
        //no user with specified username
        connection.query(
          `INSERT into customers(username, password) values("${usr.uname}","${pwwd}")`,
          function (err, rows, fields) {
            if (!err) {
              res.redirect("/login");
            } else {
              res.render("register", {
                title: "Some error occurred",
                failed: true,
              });
            }
          }
        );
      } else {
        res.render("register", {
          title: "Username already in use",
          failed: true,
        });
      }
    }
  );
});

// Item page
app.get("/item/:id", function (req, res) {
  res.locals.user = req.session.user;
  connection.query(
    `SELECT * from products where id=${req.params.id}`,
    function (error, results, fields) {
      if (error) throw error;
      // res.send(results)
      if (results.length > 0) {
        res.render("items", {
          product: results[0],
        });
      } else {
        res.redirect("/404");
      }
    }
  );
});

//buy
app.post("/buy", function (req, res) {
  if (req.session.user){
    let account = req.session.user;
    let order = req.body;
    let price;
    connection.query(`select price from products where id=${order.product}`,
    function (error, results, fields) {
      if (!error){
        price=parseInt(results[0].price);
        bill_amount=price*order.qty;
        connection.query(
          `insert into orders(pid,uid,qty,bill_amount) values("${order.product}","${account.id}",${order.qty},${bill_amount})`,
          function (err, rows, fields) {
            if (!err) {
              connection.query(
                `UPDATE products set stock = stock - ${order.qty} where id=${order.product}`,
                function (error, results, fieldss) {
                  if (!error) console.log("Successfully purchased");
                  res.redirect("/orders");
                }
              );
            } else {
              console.log("error in purchase");
            }
          }
        );
      }
      else console.log("error in price finding");
    }
    );
  }
  else
  res.redirect("/login");
});

// customer orders page
app.get("/orders", function (req, res) {
  if (req.session.user) {
    res.locals.user = req.session.user;
    connection.query(
      `select orders.id as oid,pid,uid,qty,status,date,name,picture,bill_amount from orders,products where uid = ${req.session.user.id} and orders.pid=products.id`,
      function (err, results, fields) {
        if (!err) {
          console.log(results);
          res.render("orders", {
            orders: results,
          });
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});

//register an Admin manually
app.get("/secretadminreg", function (req, res) {
  let pwwd = pwHash("password");
  connection.query(
    `insert into admins(username, password) values('admin', '${pwwd}')`,
    function (err, rows, fields) {
      if (!err) console.log("Added User: ", rows);
      else {
        throw err;
        console.log("Error while performing Query.");
      }
    }
  );
});

//log out
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

// ****************
//     Admin Views

// ****************

//login page
app.get("/admin", (req, res) => {
  res.render("admin/login", { title: "Admin Login" });
});

//Admin login route
app.post("/admin", function (req, res) {
  console.log(req.body);
  let usr = req.body;
  connection.query(
    `SELECT * from admins where username="${usr.uname}"`,
    function (err, rows, fields) {
      if (!err) {
        console.log("The solution is: ", rows[0]);
        if (typeof rows[0] != "undefined" && pwVerify(usr.pwd, rows[0].password)) 
        {
          console.log("Successful Login");
          req.session.admin = {
            id: rows[0].id,
            username: rows[0].username,
          };
          res.redirect("admin/dashboard");
        } else {
          res.render("admin/login", {
            title: "Failed! Try again",
            failed: true,
          });
        }
      } else throw err;
    }
  );
});

//admin dashboard
app.get("/admin/dashboard", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query(
      "SELECT * from products",
      function (error, results, fields) {
        if (error) throw error;
        res.render("admin/dash", {
          products : results,
          title: "Admin Dashboard"
        });
      }
    );
  } else {
    res.redirect("/admin");
  }
});

//data export in form of csv file
app.post('/admin/export', (req, res) => {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query(
      `select name,descr,price,stock from products`,
      function (err, results, fields) {
        if (!err) {
          const rows = results.map(row => {
            return {
              "Name": row.name,
              "Description": row.descr,
              "Price": row.price,
              "Stock": row.stock
            };
          });
          const csvWriter = createCsvWriter({
            path: 'inventory_data.csv',
            header: [
              {id: 'Name', title: 'Name'},
              {id: 'Description', title: 'Description'},
              {id: 'Price', title: 'Price'},
              {id: 'Stock', title: 'Stock'}
            ],
            encoding: 'utf8'
          });
        csvWriter.writeRecords(rows)
            .then(() => {
                console.log('CSV file created successfully');
                res.download('inventory_data.csv', 'inventory_data.csv'); // Download CSV file
            })
            .catch(err => {
                console.error('Error creating CSV file', err);
                res.status(500).send('Error creating CSV file');
            });
        }
      }
    );
  } else {
    res.redirect("/admin");
  }
}); 

//view active orders
app.get("/admin/orders", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query(
      `select orders.id as oid,pid,uid,qty,status,date,name,picture,username,bill_amount from orders,products,customers where status="ordered" and orders.pid=products.id and orders.uid=customers.id`,
      function (err, rows, fields) {
        if (!err) {
          res.render("admin/orders", {
            results: rows,
            title: "Active Orders"
          });
        }
      }
    );
  } else {
    res.redirect("/admin");
  }
});

//confirm orders
app.get("/orders/:id/confirm", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query(
      `update orders set status="delivered" where id = ${req.params.id}`,
      function (err, results, fields) {
        if (!err) {
          console.log(results);
          res.redirect("/admin/sales");
        }
      }
    );
  } else {
    res.redirect("/login");
  }
});

//view completed sales
app.get("/admin/sales", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query(
      `select orders.id as oid,pid,uid,qty,status,date,name,picture,username,bill_amount from orders,products,customers where status="delivered" and orders.pid=products.id and orders.uid=customers.id`,
      function (err, rows, fields) {
        if (!err) {
          res.render("admin/sales", {
            results: rows,
              title: "Sales"
          });
        }
      }
    );
  } else {
    res.redirect("/admin");
  }
});

//view all the products
app.get("/admin/manage", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query(
      "SELECT * from products",
      function (error, results, fields) {
        if (error) throw error;
        res.render("admin/manage", {
          products: results,
          title: "Manage Products"
        });
      }
    );
  } else {
    res.redirect("/admin");
  }
});

//edit product stock
app.get("/stock/update/:id/:newval", function (req, res) {
  if (req.session.admin) {
    connection.query(
      `UPDATE products set stock = ${req.params.newval} where id=${req.params.id}`,
      function (error, results, fields) {
        if (error) throw error;
        res.send("{updated}");
      }
    );
  } else {
    res.redirect("/admin");
  }
});
 
//edit product price
app.get("/price/update/:id/:newval", function (req, res) {
  if (req.session.admin) {
    connection.query(
      `UPDATE products set price = ${req.params.newval} where id=${req.params.id}`,
      function (error, results, fields) {
        if (error) throw error;
        res.send("{updated}");
      }
    );
  }else {
    res.redirect("/admin");
  }
});

//add new Product for admin
app.get("/admin/new", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    res.render("admin/new",
    { 
      title: "New Product"
    });
  } else {
    res.redirect("/admin");
  }
});

app.post("/admin/new", function (req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  // The name of the input field
  let imgFile = req.files.image;
  let imgUnique = uniqueString();
  let imgUrl = "/static/uploads/" + imgUnique + ".jpg";
  let data = req.body;
  // Use the mv() method to move to a place in server
  imgFile.mv(__dirname + imgUrl, function (err) {
    if (err) return res.status(500).send(err);
    // res.send('File uploaded!');
    connection.query(
      `INSERT into products(name,descr,price,stock,picture) values('${data.name}','${data.descr}','${data.price}', '${data.stock}','${imgUnique}.jpg')`,
      function (error, results, fields) {
        if (error) throw error;
        res.redirect("/admin/manage");
      }
    );
  });
});

//Edit Product for admin
app.get("/admin/edit/:id", function (req, res) {
  if (req.session.admin) {
    res.locals.admin = req.session.admin;
    connection.query(
      "SELECT * from products where id=" + req.params.id,
      function (error, results, fields) {
        if (error) throw error;
        res.render("admin/edit", {
          product: results[0], 
           title: "Edit Product"
        });
      }
    );
  } else {
    res.redirect("/admin");
  }
});

//post request for edit product for admin
app.post("/admin/edit/:id", function (req, res) {
  let data = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    connection.query(
      `UPDATE products set name='${data.name}', descr = '${data.descr}', stock=${data.stock}, price = ${data.price} where id=${req.params.id}`,
      function (error, results, fields) {
        if (error) throw error;
        res.redirect("/admin/manage");
      }
    );
  } else {
    // The name of the input field
    let imgFile = req.files.image;
    let imgUnique = uniqueString();
    let imgUrl = "/static/uploads/" + imgUnique + ".jpg";
    // Use the mv() method to move to a place in server
    imgFile.mv(__dirname + imgUrl, function (err) {
      if (err) return res.status(500).send(err);
      connection.query(
        `UPDATE products set name='${data.name}', descr = '${data.descr}', stock=${data.stock}, price = ${data.price}, picture='${imgUnique}.jpg' where id=${req.params.id}`,
        function (error, results, fields) {
          if (error) throw error;
          res.redirect("/admin/manage");
        }
      );
    });
  }
});

// Handling non matching request from the client
app.use((req, res, next) => {
  res.status(404).render("404", {
    title: "404",
  })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server started at port " + port);
  console.log("http://localhost:" + port);
});
