const express = require("express");
const multer = require("multer");
const mysql = require("mysql2/promise");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

// 儲存上傳的檔案的目錄
const upload = multer({ dest: "uploads/" });

// 資料庫連接資訊
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "guide-app",
};

// 新增店家的 API 路由
app.post("/api/shops", upload.single("picture"), async (req, res) => {
  try {
    // 取得從前端傳來的表單資料
    const { name, address, phone, openingHours, category, description } = req.body;

    // 取得上傳的店家圖片檔案名稱
    const pictureFilename = req.file.filename;

    // 建立資料庫連線
    const connection = await mysql.createConnection(dbConfig);

    // 執行 SQL 指令，新增店家資料
    const [result] = await connection.execute(
      "INSERT INTO `shops` (`id`, `name`, `address`, `phone`, `picture`, `openingHours`, `category`, `description`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [uuidv4(), name, address, phone, pictureFilename, openingHours, category, description]
    );

    // 關閉資料庫連線
    await connection.end();

    // 回傳成功的訊息與新增的店家資訊
    res.status(200).json({
      success: true,
      shop: {
        id: result.insertId,
        name,
        address,
        phone,
        pictureFilename,
        openingHours,
        category,
        description,
      },
    });
  } catch (error) {
    console.error(error);
    // 回傳錯誤訊息
    res.status(500).json({ success: false, message: "新增店家失敗" });
  }
});

// 啟動應用程式
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
