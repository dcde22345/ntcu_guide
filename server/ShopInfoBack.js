const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 5175;

const cors = require('cors');
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'au4a83',
  database: 'ntcu_guide',
});

connection.connect(err => {
  if (err) {
    console.error('資料庫連線失敗：', err);
    return;
  }
  console.log('成功連線到資料庫');
});

app.get('/api/shops', (req, res) => {
  const query = 'SELECT * FROM shops';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('查詢資料庫失敗：', err);
      res.status(500).json({ error: '無法取得店家資訊' });
      return;
    }

    res.json(results);
  });
});

app.get('/api/shops/:id/picture', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT `圖片` FROM shops WHERE `店家ID` = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('查詢資料庫失敗：', err);
      res.status(500).json({ error: '無法取得店家圖片' });
      return;
    }

    if (results.length === 0 || !results[0].圖片) {
      res.status(404).json({ error: '找不到指定的店家圖片' });
      return;
    }

    const picture = results[0].圖片;
    //const pictureBuffer = Buffer.from(picture, 'base64');
    //res.setHeader('Content-Type', 'image/jpeg'); // 假設圖片格式為 JPEG
    res.setHeader('Content-Type', 'image/*');
    //res.end(pictureBuffer);
    res.end(Buffer.from(picture, 'binary'));
  });
});

app.listen(port, () => {
  console.log(`伺服器已啟動，監聽連接埠 ${port}`);
});
