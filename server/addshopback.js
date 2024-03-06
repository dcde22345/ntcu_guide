const express = require("express");
const multer = require("multer");
const mysql = require("mysql2/promise");
const path = require("path");
const app = express();
const port = 4000;
const cors = require("cors");

app.use(cors());

// 配置Multer
const storage = multer.diskStorage({
  destination: "./uploads", // 指定檔案存放的目錄
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, uniqueSuffix + extname);
  },
});
// 初始化Multer
const upload = multer({ storage });

// 資料庫連接資訊
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "au4a83",
  database: "ntcu_guide",
};

let lastShopId = 0;
// 新增店家的 API 路由
app.post("/api/shops", upload.single("picture"), async (req, res) => {
  try {
    // 取得從前端傳來的表單資料
    const { name, address, phone, openingHours, category, description } = req.body;

    // 取得上傳的店家圖片檔案位置
    const imagePath = req.file.path;

    // 建立資料庫連線
    const connection = await mysql.createConnection(dbConfig);

    // 取得目前最後一個店家的 id
    const [[{ maxShopId }]] = await connection.execute("SELECT MAX(店家ID) AS maxShopId FROM shops");

    // 將目前最後一個店家的 id 加一，設為新的 id
    const id = maxShopId ? maxShopId + 1 : 1;
    lastShopId = id;

    // 執行 SQL 指令，新增店家資料
    await connection.execute(
      "INSERT INTO `shops` (`店家ID`, `名稱`, `地址`, `電話`, `圖片`,`評分`, `營業時間`, `類型`, `簡介`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [lastShopId, name, address, phone, imagePath, null,openingHours, category, description]
    );

    // 關閉資料庫連線
    await connection.end();

    // 回傳成功的訊息與新增的店家資訊
    res.status(200).json({
      success: true,
      shop: {
        lastShopId,
        name,
        address,
        phone,
        imagePath,
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
