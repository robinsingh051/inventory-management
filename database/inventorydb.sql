CREATE DATABASE  IF NOT EXISTS `inventory_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventory_database`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory_database
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','$2a$10$I3qKkNLEUGVIqbGCNyydSOovA5t.0385z7.BQI2vc8IuHms1U3dgi'),(2,'admin','$2a$10$EMzt2K0BReOIbgjsrqJRtug0Tb/8MggtAnMX6lXVcERzqatT.Si5a');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'robin.19cs134@cambridge.edu.in','$2a$10$HuicTy3Hy/itsE9IKe77GOojJdCXxZ/R9/sveITrTzye2ePSLC3OS');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pid` int NOT NULL,
  `uid` int NOT NULL,
  `qty` int NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'ordered',
  `bill_amount` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (8,'2023-04-15 17:02:22',1,1,2,'delivered',690),(9,'2023-04-15 17:16:41',2,1,4,'delivered',1272),(10,'2023-04-15 17:24:42',4,1,2,'delivered',650),(11,'2023-04-18 05:45:49',4,1,4,'delivered',1300),(12,'2023-04-18 13:45:33',1,1,1,'ordered',345);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) NOT NULL,
  `descr` text NOT NULL,
  `price` int NOT NULL,
  `stock` int NOT NULL,
  `picture` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Mississippi Mud','Mississippi Mud is a delectable chocolate fudge and ice cream, married by a fudge ribbon and sprinkled with brownie pieces.',345,81,'b2fc2a6fb73e24b4157baf12c91f7dfb.jpg'),(2,'Dutch Chocolate Ice cream','Tempting chocolate ice cream with a distinct hint of cocoa. The mother of every chocolate ice cream creation of ours.',318,5,'2b8f61257a5e75a1229e755c49547a82.jpg'),(4,'Three cheers chocolate Ice cream','A heavenly combination of chocolate and vanilla married together with chocolate chips and ribbon.',325,90,'cc11d456d4d31d0bf63bf22cf345efd6.jpg'),(5,'Roasted Coffee Cream Ice cream','Luscious ice cream with freshly ground coffee. This cool coffee flavoured ice cream will delight all coffee lovers out there!',354,17,'1de49686ded98078597774dfb15fd0e7.jpg'),(6,'Amazin Raisin','Sweet honey raisin ice cream with softened raisin pieces.',315,55,'a68b1469e07fcc48b06dcbc8ed13a33a.jpg'),(7,'Caramel Chocolate Crunch','Vanilla-flavored ice cream sprinkled with chocolate cookie pieces and swirled with a creme caramel ribbon.',395,100,'d63b3aac42c69e655d3a18726ec9fe61.jpg'),(8,'Caramel Praline Cheesecake','Indulgent vanilla cheesecake flavored ice cream swirled with a caramel ribbon and praline pecans.',400,3,'585120fc7c248f3f3b8f7920b009e1e2.jpg'),(9,'Chocolate Almond','Chocolate ice cream loaded with roasted almonds.',310,100,'31d55f9b4c244c02044759c9891ccd34.jpg'),(10,'Chocolate Trilogy','A trio of chocolate fudge, white, and Swiss chocolate flavored ice creams, loaded with chocolate chips and caramel-covered pretzels.',290,65,'1120b21b96c841f42f316f3397448888.jpg'),(11,'Cookies n Cream','Vanilla ice cream with lots of cookie chunks throughout.',395,87,'686f5caa98aaa052162227468832e943.jpg'),(12,'Tender Coconut ice cream','Coconut-flavored ice cream with shredded coconut throughout.',250,18,'f1b6201e47a8e25ce3ca3d84ebb041c2.jpg'),(13,'Gold Medal Ribbon','Vanilla and chocolate ice creams with a caramel ribbon.',289,100,'9b645e14afcb28de1b7736ff3c11980a.jpg'),(14,'Love Potion','Cupids white chocolate and raspberry ice creams swirled with a raspberry ribbon and loaded with raspberry-filled chocolate cups and chocolate chips.',400,21,'9f760560dc8b06cba049f96b325b01ae.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-22 11:02:25
