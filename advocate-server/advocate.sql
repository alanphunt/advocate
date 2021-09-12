-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2021 at 05:18 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `advocate`
--
CREATE DATABASE IF NOT EXISTS `advocate` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `advocate`;

-- --------------------------------------------------------

--
-- Table structure for table `account_details`
--

DROP TABLE IF EXISTS `account_details`;
CREATE TABLE `account_details` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `account_non_expired` tinyint(1) NOT NULL,
  `account_non_locked` tinyint(1) NOT NULL,
  `credentials_non_expired` tinyint(1) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `teacher_id` varchar(15) NOT NULL,
  `date_created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `authorities`
--

DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities` (
  `id` varchar(15) NOT NULL,
  `username` varchar(100) NOT NULL,
  `authority` varchar(100) NOT NULL,
  `enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `baselines`
--

DROP TABLE IF EXISTS `baselines`;
CREATE TABLE `baselines` (
  `id` varchar(11) NOT NULL,
  `student_id` varchar(11) NOT NULL,
  `label` varchar(50) NOT NULL,
  `date_started` date NOT NULL,
  `baseline_template` varchar(50) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `comments` varchar(10000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `benchmarks`
--

DROP TABLE IF EXISTS `benchmarks`;
CREATE TABLE `benchmarks` (
  `id` varchar(15) NOT NULL,
  `complete` tinyint(1) NOT NULL,
  `label` varchar(100) NOT NULL,
  `description` varchar(10000) NOT NULL,
  `tracking` varchar(100) NOT NULL,
  `mastery_date` date NOT NULL,
  `met_date` date DEFAULT NULL,
  `goal_id` varchar(15) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `trial_average` double DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `classrooms`
--

DROP TABLE IF EXISTS `classrooms`;
CREATE TABLE `classrooms` (
  `id` varchar(15) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `teacher_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
CREATE TABLE `documents` (
  `id` varchar(15) NOT NULL,
  `trial_id` varchar(15) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(100) NOT NULL,
  `size` int(11) NOT NULL,
  `formatted_size` varchar(100) NOT NULL,
  `path` varchar(100) NOT NULL,
  `upload_date` date DEFAULT current_timestamp(),
  `last_modified` bigint(15) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `baseline_id` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
CREATE TABLE `goals` (
  `id` varchar(15) NOT NULL,
  `goal` varchar(1000) NOT NULL,
  `goal_name` varchar(100) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `monitor` tinyint(1) NOT NULL,
  `start_date` date DEFAULT NULL,
  `mastery_date` date NOT NULL,
  `student_id` varchar(15) NOT NULL,
  `completion_date` date DEFAULT NULL,
  `complete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `jwt_key`
--

DROP TABLE IF EXISTS `jwt_key`;
CREATE TABLE `jwt_key` (
  `id` varchar(15) NOT NULL,
  `key_value` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` varchar(15) NOT NULL,
  `name` varchar(100) NOT NULL,
  `grade` varchar(10) NOT NULL,
  `age` varchar(100) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `classroom_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers` (
  `id` varchar(15) NOT NULL,
  `username` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `trackings`
--

DROP TABLE IF EXISTS `trackings`;
CREATE TABLE `trackings` (
  `id` varchar(15) NOT NULL,
  `label` varchar(100) NOT NULL,
  `cue_count` tinyint(3) DEFAULT 0,
  `permanent_product` varchar(100) DEFAULT NULL,
  `duration_in_seconds` smallint(6) DEFAULT 0,
  `accuracy_percentage` smallint(6) DEFAULT 0,
  `trial_id` varchar(15) DEFAULT NULL,
  `baseline_id` varchar(11) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL,
  `correct` tinyint(1) DEFAULT 0,
  `frequency` smallint(6) DEFAULT 0,
  `best` int(11) DEFAULT 0,
  `out_of` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tracking_meta`
--

DROP TABLE IF EXISTS `tracking_meta`;
CREATE TABLE `tracking_meta` (
  `id` varchar(11) NOT NULL,
  `tracking_id` varchar(11) NOT NULL,
  `label` varchar(50) NOT NULL,
  `correct` tinyint(1) NOT NULL,
  `enabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `trials`
--

DROP TABLE IF EXISTS `trials`;
CREATE TABLE `trials` (
  `id` varchar(15) NOT NULL,
  `label` varchar(100) NOT NULL,
  `trial_number` int(3) NOT NULL,
  `date_started` date NOT NULL,
  `date_completed` date DEFAULT NULL,
  `comments` varchar(10000) DEFAULT NULL,
  `benchmark_id` varchar(15) NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `trial_template` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_details`
--
ALTER TABLE `account_details`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `authorities`
--
ALTER TABLE `authorities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `baselines`
--
ALTER TABLE `baselines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `benchmarks`
--
ALTER TABLE `benchmarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classrooms`
--
ALTER TABLE `classrooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `goals`
--
ALTER TABLE `goals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `trackings`
--
ALTER TABLE `trackings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tracking_meta`
--
ALTER TABLE `tracking_meta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trials`
--
ALTER TABLE `trials`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
