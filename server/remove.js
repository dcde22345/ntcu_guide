const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mysql = require("mysql2/promise");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dbConfig = {
  user: "root",
  host: "localhost",
  password: "au4a83",
  database: "shop",
};
let lastShopId = 0;

//刪除店家需要取得資料庫資料 這部分先留著
app.post("/api/shops", upload.single("picture"), async (req, res) => {
  try{
  const name = req.body;
  const address = req.body;
  const phone = req.body;
  const openingHours = req.body;
  const category = req.body;
  const Score = req.body; //addshopback.js沒有的變數，新加的
  const description = req.body;

  const pictureFilename = req.file.filename;

  const connection = await mysql.createConnection(dbConfig);

  const [[{ maxShopId }]] = await connection.execute("SELECT MAX(店家ID) AS maxShopId FROM shops");

  const id = maxShopId ? maxShopId + 1 : 1;
    lastShopId = id;

    await connection.execute(
      "DELETE FROM `shops` (`店家ID`, `名稱`, `地址`, `電話`, `圖片`, `營業時間`, `類型`, `簡介`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [lastShopId, name, address, phone, pictureFilename, openingHours, category, description]
    );
      
    await connection.end();
    
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    // 回傳錯誤訊息
    res.status(500).json({ success: false, message: "刪除店家失敗" });
  }
});

app.delete("/api/delete/:id", (req, res) => {

  const sqlDelete = "DELETE FROM shops WHERE id = ?";
  
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, (req, res) => {
  console.log("server is running on port ${PORT}");
});
