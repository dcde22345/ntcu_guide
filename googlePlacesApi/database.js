const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "au4a83",
  database: "ntcu_guide",
});

// 連接到資料庫
const connect = () => {
  connection.connect((error) => {
    if (error) {
      console.error("資料庫連線錯誤:", error);
    } else {
      console.log("已成功連接到資料庫");
    }
  });
};

// 將資料插入資料庫shops
const insertShops = async (placeDetail) => {
  const query = `INSERT INTO shops (名稱, 地址, 電話, 營業時間, 簡介, 評分, 圖片, 類型) VALUES (?,?,?,?,?,?,?,?)`;
  const values = [
    placeDetail.name,
    placeDetail.address,
    placeDetail.phone,
    placeDetail.opening_hours,
    placeDetail.review,
    placeDetail.rating,
    placeDetail.photo,
    placeDetail.type,
  ];
  connection.query(query, values, (error, result) => {
    if (error) {
      console.error("插入資料失敗:", error);
    } else {
      console.log("資料已成功插入資料庫");
    }
  });
};

// 中斷連線
const disconnect = () => {
  connection.end((err) => {
    if (err) {
      console.error("無法中斷資料庫連線:", err);
    } else {
      console.log("已成功中斷資料庫連線");
    }
  });
};

module.exports = { insertShops, connect, disconnect };
