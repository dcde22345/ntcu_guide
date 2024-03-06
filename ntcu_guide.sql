--
-- 資料庫： `功能`
--

-- --------------------------------------------------------

--
-- 資料表結構 `_____________________`
--

-- 刪除原本的database

DROP DATABASE ntcu_guide;

CREATE DATABASE ntcu_guide;

-- 使用ntcu_guide
USE ntcu_guide;

-- 建立users, comments, shops三個table

CREATE TABLE users (
  使用者ID INT PRIMARY KEY AUTO_INCREMENT,
  使用者姓名 varchar(20) NOT NULL UNIQUE,
  密碼 varchar(255) NOT NULL,
  電子郵件 varchar(255) NOT NULL UNIQUE,
  性別 ENUM('男', '女') NOT NULL,
  生日 DATE NOT NULL,
  權限 INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE comments (
  評論ID INT PRIMARY KEY AUTO_INCREMENT,
  評論者ID INT,
  評論對象ID INT,
  評論時間 DATETIME,
  評論內容 TEXT,
  評分 FLOAT CHECK(評分 >= 0.0 AND 評分 <= 5.0),
  父評論ID INT

) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE shops (
  店家ID INT PRIMARY KEY AUTO_INCREMENT,
  名稱 VARCHAR(20) NOT NULL,
  地址 VARCHAR(255) NOT NULL,
  電話 VARCHAR(15) NOT NULL,
  營業時間 VARCHAR(255) NOT NULL,
  簡介 TEXT,
  評分 FLOAT CHECK(評分 >= 0.0 AND 評分<=5.0),
  圖片 TEXT,
  類型 ENUM("美食", "生活", "購物", "其他") NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



-- 在 TABLE `comments` 中加入FK~ (在comments中，點SQL，把這段程式執行)
SELECT * FROM `comments` WHERE 1;
ALTER TABLE `comments` ADD FOREIGN KEY (`評論者ID`) REFERENCES `users` (`使用者ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `comments` ADD FOREIGN KEY (`評論對象ID`) REFERENCES `shops` (`店家ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE `comments` ADD FOREIGN KEY (`父評論ID`) REFERENCES `comments` (`評論ID`) ON DELETE RESTRICT ON UPDATE RESTRICT;