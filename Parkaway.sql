-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: DR_list
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dr_table`
--

DROP TABLE IF EXISTS `dr_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dr_table` (
  `cpi` float(10,2) DEFAULT NULL,
  `roll_no` varchar(10) DEFAULT NULL,
  UNIQUE KEY `roll_no` (`roll_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dr_table`
--

LOCK TABLES `dr_table` WRITE;
/*!40000 ALTER TABLE `dr_table` DISABLE KEYS */;
INSERT INTO `dr_table` VALUES (8.84,'15D070046'),(9.84,'150070005'),(7.20,'15D070045'),(9.05,'150070016'),(8.90,'15D070025'),(8.10,'15D070047');
/*!40000 ALTER TABLE `dr_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lock_admin`
--

DROP TABLE IF EXISTS `lock_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lock_admin` (
  `lock_id` varchar(40) DEFAULT NULL,
  `lock_battery` int(11) DEFAULT NULL,
  `lock_latitude` float DEFAULT NULL,
  `lock_longitude` float DEFAULT NULL,
  `lock_open` tinyint(1) DEFAULT NULL,
  UNIQUE KEY `lock_id` (`lock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lock_admin`
--

LOCK TABLES `lock_admin` WRITE;
/*!40000 ALTER TABLE `lock_admin` DISABLE KEYS */;
INSERT INTO `lock_admin` VALUES ('8879146477',88,19.12,72.91,1),('9826014183',75,19.119,72.847,0),('8879178724',83,19.0977,72.9164,0);
/*!40000 ALTER TABLE `lock_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parkaway`
--

DROP TABLE IF EXISTS `parkaway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parkaway` (
  `car_num` varchar(20) DEFAULT NULL,
  `lock_id` varchar(40) DEFAULT NULL,
  `latitude` varchar(20) DEFAULT NULL,
  `longitude` varchar(20) DEFAULT NULL,
  `hours` int(11) DEFAULT NULL,
  `minutes` int(11) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT '0',
  `fine` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parkaway`
--

LOCK TABLES `parkaway` WRITE;
/*!40000 ALTER TABLE `parkaway` DISABLE KEYS */;
INSERT INTO `parkaway` VALUES ('MP-04-1371','9826014183','19.1303899','72.9152462',17,33,1,212),('MH-02-1969','8879146477','19.1303899','72.9152462',17,38,0,0),('MP-05-1371','9826014183','19.1405277','72.9165151',17,22,1,34),('MP-04-1378','8879178724','19.130575999999998','72.9164921',11,11,0,0),('MP-04-1370','9826014183','19.1305916','72.9154769',11,49,1,0),('MP-04-1370','9826014183','19.1305916','72.9154769',11,50,1,0),('MP-04-1371','9826014183','19.1305916','72.9154769',11,51,1,0),('MP-04-1371','9826014183','19.1305916','72.9154769',11,56,1,0),('MP-04-1371','9826014183','19.1305916','72.9154769',12,8,0,0),('MP-04-1371','9826014183','undefined','undefined',12,8,0,0);
/*!40000 ALTER TABLE `parkaway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_id`
--

DROP TABLE IF EXISTS `user_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_id` (
  `name` varchar(25) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `lock_id` varchar(25) DEFAULT NULL,
  `locker` tinyint(1) DEFAULT NULL,
  `unlocker` tinyint(1) DEFAULT NULL,
  `id` varchar(10) DEFAULT NULL,
  `locks_handled` int(11) DEFAULT '0',
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_id`
--

LOCK TABLES `user_id` WRITE;
/*!40000 ALTER TABLE `user_id` DISABLE KEYS */;
INSERT INTO `user_id` VALUES ('chinmay','9826014183','9826014183',0,1,'1',7),('Nikunj','8879146477','9826014183',1,0,'2',5);
/*!40000 ALTER TABLE `user_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_req`
--

DROP TABLE IF EXISTS `user_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_req` (
  `car_num` varchar(20) DEFAULT NULL,
  `phone_num` varchar(10) DEFAULT NULL,
  `hours` int(11) DEFAULT NULL,
  `minutes` int(11) DEFAULT NULL,
  `assigned` tinyint(1) DEFAULT NULL,
  `unlocker_id` varchar(10) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_req`
--

LOCK TABLES `user_req` WRITE;
/*!40000 ALTER TABLE `user_req` DISABLE KEYS */;
INSERT INTO `user_req` VALUES ('MP-04-1371','7770958899',1,40,0,'0'),('MP-07-1869','8879178724',17,24,1,'1'),('MP-07-1869','8879178724',17,26,1,'1'),('MP-04-1371','9820057771',12,38,1,'1'),('MP-04-1371','9820057771',12,40,1,'1');
/*!40000 ALTER TABLE `user_req` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-20 15:33:57
