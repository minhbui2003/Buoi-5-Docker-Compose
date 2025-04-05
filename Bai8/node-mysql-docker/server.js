const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'rootpassword',
    database: 'testdb'
});

db.connect(err => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err);
    } else {
        console.log('Kết nối MySQL thành công!');
    }
});

app.get('/', (req, res) => {
    res.send('Ứng dụng Node.js kết nối với MySQL!');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Lỗi truy vấn MySQL');
        } else {
            res.json(results);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
