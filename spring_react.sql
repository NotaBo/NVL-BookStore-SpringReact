-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 25, 2023 lúc 12:51 PM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `spring_react`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `basket`
--

CREATE TABLE `basket` (
  `id` bigint(20) NOT NULL,
  `buyer_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `basket`
--

INSERT INTO `basket` (`id`, `buyer_id`) VALUES
(1, '6eda1778-25be-4f53-82a7-a5f4227a0a76'),
(2, '6d87a272-d34e-4e94-8a36-3756d1c5a5b3'),
(3, 'fcc01b6a-c464-4ae9-89ec-3bd19bb0b951'),
(4, '75560a34-c43f-4f1c-8c1e-77e6f6439395'),
(5, 'eeafcef8-b278-4ebb-9004-b26eda3ffbbe'),
(6, '62069048-7564-4723-81ee-ecae1aace720'),
(7, '9808201c-d40d-4048-95a6-90832e2cf53b'),
(8, 'f29d33f8-e170-4cdf-a099-3585df3289bc'),
(9, '022fdeee-84fb-4664-8461-0b307650e9a6'),
(10, '5d809fb5-2cb1-4b8f-9177-308f916fbf1b'),
(11, 'b51b0b17-eafd-4136-b22f-76420b09ef8c'),
(12, '2c1c24a6-b33c-4421-8a5a-2af0b8b518b7'),
(13, '6476c199-633f-4a1d-9ced-7f85603db9be'),
(14, '86dc8889-9e8b-407b-af38-c5e2500281f0'),
(15, 'a470e50f-a39d-4275-93d9-02fed59d827e'),
(16, '90e9fcac-a083-4d6e-a991-90d0f90e3916'),
(17, '3e716172-f059-44a6-aee5-ab8fe4804065'),
(18, '8bf5f790-5416-4d2e-9a42-b8bf59faed7b'),
(19, '4703b90a-adeb-4932-99ac-55597b242184'),
(20, 'f42a245d-817a-4eab-8076-484428efca06'),
(21, 'bf7eba95-8102-4fb7-a76b-84f2f9368d97'),
(22, '8c6ec116-a83c-4d51-84b3-8b3961b8ad5a'),
(23, 'd90ba5ef-c5e0-465e-82e2-fa3487c6e3a5'),
(24, '2ba33b22-c218-4d98-9b6c-315e2bb8efc3');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `basket_item`
--

CREATE TABLE `basket_item` (
  `id` bigint(20) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `basket_id` bigint(20) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `basket_item`
--

INSERT INTO `basket_item` (`id`, `quantity`, `basket_id`, `product_id`) VALUES
(1, 1, 1, 3),
(2, 1, 2, 5),
(3, 1, 3, 6),
(4, 1, 4, 5),
(5, 1, 5, 6),
(6, 1, 6, 6),
(7, 1, 7, 6),
(8, 1, 8, 5),
(9, 2, 1, 2),
(10, 1, 1, 4),
(11, 2, 1, 1),
(12, 1, 9, 4),
(13, 1, 10, 4),
(14, 1, 11, 4),
(15, 1, 12, 4),
(16, 1, 13, 4),
(17, 1, 14, 4),
(18, 1, 15, 4),
(19, 1, 16, 5),
(20, 1, 17, 5),
(21, 1, 18, 5),
(22, 1, 19, 2),
(23, 1, 20, 1),
(24, 1, 21, 4),
(25, 1, 22, 5),
(26, 1, 23, 5),
(36, 3, 24, 8),
(41, 4, 24, 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(1255) DEFAULT NULL,
  `unit_price` decimal(13,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `units_in_stock` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `last_updated` datetime(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `unit_price`, `image_url`, `units_in_stock`, `category_id`, `brand`, `date_created`, `last_updated`) VALUES
(1, 'Superman: Action Comics Volume 5: The House of Kentn', 'The House of Kent, Superman, Superboy, Supergirl, the Legion of Super-Heroes’ Brainiac 5, and Young Justice’s Conner Kent must all unite to face an enemy from another dimension unleashed by the Invisible Mafia! This kind of power can lay waste to an entire family of super-people! All of this plus the future of the Daily Planet revealed!', '12.99', 'BOOK-COMIC-1000.jpg', 100, 1, 'Brian Michael Bendis', '2023-03-16 11:55:49.000000', NULL),
(2, 'Batman: The Silver Age Omnibus Vol. 1', 'The Caped Crusader is known for protecting the streets of Gotham from the villains who wish to cause harm. Follow along on some of his most adventurous tales in Batman: The Silver Age Omnibus Vol. 1 collecting Batman #101-116', '99.99', 'BOOK-COMIC-1001.jpg', 100, 1, 'Bill Finger', '2023-03-16 11:55:49.000000', NULL),
(3, 'The Fifth Science', 'The Fifth Science is a collection of 12 stories, beginning at the start of the Galactic Human Empire and following right through to its final days. We’ll see some untypical things along the way, meet some untypical folk: galactic lighthouses from the distant future, alien tombs from the distant past, murderers, emperors, archaeologists and drunks; mad mathematicians attempting to wake the universe itself up.And when humans have fallen back into savagery, when the secrets of space folding and perfect wisdom are forgotten, we’ll attend the empire’s deathbed, hold its hand as it goes. Unfortunately that may well only be the beginning.', '24.99', 'BOOK-FICTION-1002.jpg', 100, 2, 'Exurb1a', '2023-03-16 11:55:49.000000', NULL),
(4, 'The Summer House', 'Just when true happiness seems within reach, Callie and Olivia find a diary full of secrets... secrets that stretch across the island, and have the power to turn lives upside down. As Callie reads, she unravels a mystery that makes her heart drop through the floor. Will Callie and Luke be pulled apart by the storm it unleashes, or can true love save them?', '15.00', 'BOOK-ROMANTIC-1003.jpg', 100, 3, 'Jenny Hale', '2023-03-16 11:55:49.000000', NULL),
(5, 'The Art of Computer Programming', 'These four books comprise what easily could be the most important set of information on any serious programmer’s bookshelf.', '187.99', 'BOOK-PROGRAMMING-1004.jpg', 100, 4, 'Donald Knuth', '2023-03-16 11:55:49.000000', NULL),
(6, 'Python Programming for Beginners : The Ultimate Guide for Beginners', 'Python is a high-level interpreted programming language that is used throughout the world for general-purpose programming. It is an open-source programming language licensed by both the Free Software Foundation (FSF) and Open-Source Initiative (OSI). Like some other programming languages, its source code is also available under the GNU General Public License (GPL). Throughout this book, we will be focusing more on the Python 3.x version, which is the latest and is currently in active development.', '21.99', 'BOOK-PROGRAMMING-1005.jpg', 100, 4, 'Programming Languages Academy', '2023-03-16 11:55:49.000000', NULL),
(7, 'The Self-Taught Programmer: The Definitive Guide to Programming', 'This book is not just about learning to program; although you will learn to code. If you want to program professionally, it is not enough to learn to code; that is why, in addition to helping you learn to program, I also cover the rest of the things you need to know to program professionally that classes and books don\'t teach you. \"The Self-taught Programmer\" is a roadmap, a guide to take you from writing your first Python program, to passing your first technical interview.', '21.87', 'BOOK-PROGRAMMING-1006.jpg', 100, 4, 'Cory Althoff', '2023-03-16 11:55:49.000000', NULL),
(8, 'Computer Programming: The Bible: Learn from the basics to advanced', 'Are you ready to learn and start programming with any language in less than 12 hours? The world of technology is changing and those who know how to handle it and who have the most knowledge about it are the ones who will get ahead. If you are a beginner who is interested in learning more and getting ahead, then this guidebook is the one for you.', '14.95', 'BOOK-PROGRAMMING-1007.jpg', 100, 4, 'CyberPunk Architects', '2023-03-16 11:55:49.000000', NULL),
(9, 'Effective C: An Introduction to Professional C Programming', 'Effective C will teach you how to write professional, secure, and portable C code that will stand the test of time and help strengthen the foundation of the computing world.', '35.01', 'BOOK-PROGRAMMING-1008.jpg', 100, 4, 'Robert C. Seacord', '2023-03-16 11:55:49.000000', NULL),
(10, 'Head First Design Patterns: Building Extensible and Maintainable OOP', 'If you\'ve read a Head First book, you know what to expect: a visually rich format designed for the way your brain works. With Head First Design Patterns, 2E you\'ll learn design principles and patterns in a way that won\'t put you to sleep, so you can get out there to solve software design problems and speak the language of patterns with others on your team.', '32.43', 'BOOK-PROGRAMMING-1009.jpg', 100, 4, 'Elisabeth Robson and Eric Freeman', '2023-03-16 11:55:49.000000', NULL),
(11, 'Beginning Programming All-in-One Desk Reference For Dummies', 'Beginning Programming All In One Desk Reference For Dummies shows you how to decide what you want your program to do, turn your instructions into “machine language” that the computer understands, use programming best practices, explore the “how” and “why” of data structuring, and more. You’ll even get a look into various applications like database management, bioinformatics, computer security, and artificial intelligence. Soon you’ll realize that — wow! You’re a programmer!', '32.89', 'BOOK-PROGRAMMING-1010.jpg', 100, 4, 'Wallace Wang', '2023-03-16 11:55:49.000000', NULL),
(12, 'Machine Learning: 4 Books in 1: An Overview for Beginners to Master', 'Created with the beginner in mind, this powerful bundle delves into the fundamentals behind Python and machine learning, from basic code and mathematical formulas to complex neural networks and ensemble modeling. Inside, you’ll discover everything you need to know to get started with Python and machine learning and begin your journey to success!', '35.01', 'BOOK-PROGRAMMING-1011.jpg', 100, 4, 'Samuel Hack', '2023-03-16 11:55:49.000000', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_category`
--

CREATE TABLE `product_category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_category`
--

INSERT INTO `product_category` (`id`, `category_name`) VALUES
(1, 'COMIC'),
(2, 'FICTION'),
(3, 'ROMANTIC'),
(4, 'PROGRAMMING');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `basket`
--
ALTER TABLE `basket`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `basket_item`
--
ALTER TABLE `basket_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_basket_item_product` (`product_id`),
  ADD KEY `fk_basket_item_basket` (`basket_id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_product_category` (`category_id`);

--
-- Chỉ mục cho bảng `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `basket`
--
ALTER TABLE `basket`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `basket_item`
--
ALTER TABLE `basket_item`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `basket_item`
--
ALTER TABLE `basket_item`
  ADD CONSTRAINT `fk_basket_item_basket` FOREIGN KEY (`basket_id`) REFERENCES `basket` (`id`),
  ADD CONSTRAINT `fk_basket_item_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
