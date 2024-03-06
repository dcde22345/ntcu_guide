const express = require('express');
const mysql = require('mysql');

const app = express();

// 创建与MySQL数据库的连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ntcu_guide',
});

// 连接到MySQL数据库
connection.connect((error) => {
  if (error) {
    console.error('連線失敗', error);
  } else {
    console.log('已連線MySQL資料庫');
  }
});

// 定义获取商店数据的API端点
app.get('/api/shops', (req, res) => {
  const sql = "SELECT '店家id', '名稱', '地址' FROM 'shops'"; // 假设商店表名为'shops'

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('查詢資料庫出錯:', error);
      res.status(500).send('查詢資料庫出錯');
    } else {
      res.json(results);
    }
  });
});

// 启动后端服务
app.listen(8000, () => {
  console.log('後端服務已啟動');
});