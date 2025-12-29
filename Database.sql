-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.29 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for mychatapp
CREATE DATABASE IF NOT EXISTS `mychatapp` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mychatapp`;

-- Dumping structure for table mychatapp.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from_user_id` int NOT NULL,
  `to_user_id` int NOT NULL,
  `message` text NOT NULL,
  `date_time` datetime NOT NULL,
  `chat_status_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_chat_user1_idx` (`from_user_id`),
  KEY `fk_chat_user2_idx` (`to_user_id`),
  KEY `fk_chat_chat_status1_idx` (`chat_status_id`),
  CONSTRAINT `fk_chat_chat_status1` FOREIGN KEY (`chat_status_id`) REFERENCES `chat_status` (`id`),
  CONSTRAINT `fk_chat_user1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_chat_user2` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table mychatapp.chat: ~21 rows (approximately)
REPLACE INTO `chat` (`id`, `from_user_id`, `to_user_id`, `message`, `date_time`, `chat_status_id`) VALUES
	(1, 1, 2, 'Hello', '2024-10-02 23:36:48', 1),
	(2, 1, 3, 'Woow', '2024-10-02 23:37:39', 1),
	(3, 2, 1, 'Hello Daniru', '2024-10-02 23:38:07', 1),
	(4, 2, 3, 'Nice', '2024-10-02 23:38:36', 1),
	(5, 1, 2, 'Where are you from', '2024-10-04 23:18:35', 1),
	(6, 1, 2, 'What are you doing', '2024-10-04 23:39:27', 1),
	(7, 1, 4, 'Hello janaka', '2024-10-07 17:18:28', 1),
	(8, 1, 4, 'I am Daniru', '2024-10-07 17:18:42', 1),
	(9, 4, 1, 'Hi', '2024-10-07 17:20:55', 1),
	(10, 1, 4, 'How are you', '2024-10-07 19:26:25', 1),
	(11, 1, 3, 'Hello ishara', '2024-10-07 19:57:13', 1),
	(12, 1, 4, 'How old are you', '2024-10-07 23:07:52', 1),
	(13, 4, 1, 'Moko wenne ithin', '2024-10-09 11:14:26', 1),
	(14, 4, 1, 'Kiyanna', '2024-10-09 11:15:06', 1),
	(15, 2, 1, 'I\' m fine', '2024-10-09 11:23:42', 1),
	(16, 1, 3, 'How are you', '2024-10-09 19:38:56', 1),
	(17, 3, 1, 'I am ok', '2024-10-09 19:40:50', 1),
	(18, 1, 4, 'Moko wenne', '2024-10-09 20:00:19', 2),
	(19, 10, 1, 'Hello', '2024-10-10 00:39:33', 2),
	(20, 10, 1, 'How are you', '2024-10-10 00:39:42', 2),
	(21, 11, 1, 'Heloo sunil', '2024-10-10 10:45:53', 1),
	(22, 1, 11, 'Hello nimal', '2024-10-10 10:48:34', 1),
	(23, 1, 2, 'Hello', '2024-12-16 22:04:31', 2);

-- Dumping structure for table mychatapp.chat_status
CREATE TABLE IF NOT EXISTS `chat_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table mychatapp.chat_status: ~2 rows (approximately)
REPLACE INTO `chat_status` (`id`, `name`) VALUES
	(1, 'Seen'),
	(2, 'Unseen');

-- Dumping structure for table mychatapp.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mobile` varchar(10) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `password` varchar(20) NOT NULL,
  `registered_date` datetime NOT NULL,
  `user_status_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_user_status_idx` (`user_status_id`),
  CONSTRAINT `fk_user_user_status` FOREIGN KEY (`user_status_id`) REFERENCES `user_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table mychatapp.user: ~10 rows (approximately)
REPLACE INTO `user` (`id`, `mobile`, `first_name`, `last_name`, `password`, `registered_date`, `user_status_id`) VALUES
	(1, '0710632050', 'Sunil', 'Kapuge', 'Dani123', '2024-09-29 09:53:34', 2),
	(2, '0774155687', 'Pradeep', 'Perera', 'Pradeep123', '2024-10-02 23:34:30', 2),
	(3, '0755958945', 'Ishara', 'Deshan', 'Ishara123', '2024-10-02 23:35:23', 2),
	(4, '0772144654', 'Janaka', 'Sangeeth', 'Jsnaka123', '2024-10-02 23:36:23', 2),
	(5, '0710837020', 'Nimesh', 'Shaluka', 'Nimesh123', '2024-10-07 17:14:37', 2),
	(6, '0776188647', 'Prabath', 'Jayasuriya', 'Prabath123', '2024-10-09 19:28:58', 2),
	(7, '0756968912', 'Suman', 'Gunathilaka', 'Saman123', '2024-10-09 19:52:08', 2),
	(9, '0710534060', 'Chathura', 'Perera', 'Chathura123', '2024-10-10 00:34:11', 2),
	(10, '0710634010', 'Pawani', 'Kumari', 'Pawani123', '2024-10-10 00:38:25', 2),
	(11, '0710632053', 'Nimal', 'Perera', 'Nimal123', '2024-10-10 10:42:51', 1);

-- Dumping structure for table mychatapp.user_status
CREATE TABLE IF NOT EXISTS `user_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- Dumping data for table mychatapp.user_status: ~2 rows (approximately)
REPLACE INTO `user_status` (`id`, `name`) VALUES
	(1, 'online'),
	(2, 'offline');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
