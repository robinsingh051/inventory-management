
# INVENTORY MANAGEMENT SYSTEM

The objective of this project is to build a basic inventory management system that allows a company to keep track of their inventory levels, stock movements, and stock availability. The system should be able to add new items/products to the inventory, update the stock levels, and generate reports on inventory status.


## Features

- User authentication and authorization
- Ability to add, update, and delete items from the inventory
- Ability to update the stock levels of items in the inventory
- Ability to generate reports on inventory status (e.g., current inventory levels, low stock alerts, out of stock alerts)
- Ability to export the inventory data in CSV or Excel format
- User-friendly interface/UI for easy navigation


## Screenshots

- Login Page <br><img src="https://github.com/robinsingh051/inventory-management/blob/main/static/imgs/login.png" width="560" height="320"><br>
- Admin dashboard <br><img src="https://github.com/robinsingh051/inventory-management/blob/main/static/imgs/admin%20dashboard.png" width="560" height="320"><br>
- Customer dashboard <br><img src="https://github.com/robinsingh051/inventory-management/blob/main/static/imgs/customer%20dashboard.png" width="560" height="320"><br>
- Products Manage page <br><img src="https://github.com/robinsingh051/inventory-management/blob/main/static/imgs/manage.png" width="560" height="320"><br>


## Run Locally

Clone the project

```bash
  git clone https://github.com/robinsingh051/inventory-management
```
Open mysql workbench and run following queries

```bash
  CREATE DATABASE inventory_database;
  USE inventory_database;
```
Configure your database connection in app.js file

Go to the project directory

```bash
  cd inventory-management
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon
```


## Technologies used

[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png" width="50" height="30">](https://nodejs.org/)
[<img src="https://expressjs.com/images/favicon.png" width="50" height="30">](https://expressjs.com/)
[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png" width="50" height="30">](https://getbootstrap.com/)
[<img src="https://www.mysql.com/common/logos/logo-mysql-170x115.png" width="50" height="30">](https://www.mysql.com/)
[<img src="https://www.chartjs.org/media/logo-title.svg" width="50" height="30">](https://www.chartjs.org/)
[<img src="https://www.gstatic.com/webp/gallery3/2.png" width="50" height="30">](https://www.npmjs.com/package/bcrypt)
[<img src="https://vuejs.org/images/logo.png" width="50" height="30">](https://vuejs.org/)
[<img src="https://www.w3.org/html/logo/downloads/HTML5_Logo_256.png" width="50" height="30">](https://developer.mozilla.org/en-US/docs/Web/HTML)
[<img src="https://bulma.io/images/bulma-logo.png" width="50" height="30">](https://bulma.io/)
[<img src="https://sweetalert2.github.io/images/SweetAlert2.png" width="50" height="30">](https://sweetalert2.github.io/)
[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2560px-Unofficial_JavaScript_logo_2.svg.png" width="50" height="30">](https://developer.mozilla.org/en-US/docs/Web/JavaScript)



## Authors

- [Robin Singh](https://github.com/robinsingh051)
