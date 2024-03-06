const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require("multer")
const path = require("path")
const app = express();
const port = 5000;

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

let lastMessageId = 0;
// 保存留言的 API 路由
app.post("/api/comments", async (req, res) => {
  try {
    const { name, content, score } = req.body;

    const connection = await mysql.createConnection(dbConfig);

    // 取得目前最後一個留言的 id
    const [[{ maxMessageId }]] = await connection.execute("SELECT MAX(評論ID) AS maxMessageId FROM comments");

    // 將目前最後一個留言的 id 加一，設為新的 id
    const id = maxMessageId ? maxMessageId + 1 : 1;
    lastMessageId = id;

    // 執行 SQL 指令，新增店家資料
    await connection.execute(
      "INSERT INTO `comments` (`評論ID`, `評論者ID`, `評論內容`, `評分`) VALUES (?, ?, ?, ?)",
      [lastMessageId, name, content, score]
    );

    // 關閉資料庫連線
    await connection.end();


    // 回傳成功的訊息與新增的店家資訊
    res.status(200).json({
      success: true,
      comment: {
        lastMessageId, 
        name,
        content, 
        score,
      },
    });
    } catch (error) {
    console.error(error);
    // 回傳錯誤訊息
    res.status(500).json({ success: false, message: "新增留言失敗" });
    }
    });

// 啟動應用程式
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
