// server
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
// リクエストのボディをパースする設定
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// db
const mysql = require('mysql2/promise');
const db_setting = {
 host: process.env.DB_HOST || 'mysql', // dockerコンテナの場合はホストはサービス名になる。
 port: process.env.DB_PORT || 3306,
 user: process.env.DB_USER || 'root',
 password: process.env.DB_PASSWORD ||'manager',
 database: process.env.DB_DATABASE ||'management'
};

const apiVer = "v1";

/*
* APIの設定
*/

// ダミーデータの作成
// body: none, num: how many dummy data
// return: result or error message
app.post(`/api/${apiVer}/dummy/:num`, async(req, res) => {
    const num = req.params.num;
    let connection
    try {
        connection = await mysql.createConnection(db_setting);
        connection.beginTransaction();
        for (let i=0; i<num; i++) {
            let gender = i % 2 == 0 ? "男性" : "女性";
            let year = `${i%20}`;
            for (let j=0; j<(2-year.length); j++) {
                year = "0" + year;
            }
            let month = `${(i%12)+1}`;
            for (let j=0; j<(2-month.length); j++) {
                month = "0" + month;
            }
            let date = `${(i%28)+1}`;
            for (let j=0; j<(2-date.length); j++) {
                date = "0" + date;
            }
            let birth = `20${year}-${month}-${date}`;
            let blood = i % 2 == 0 ? "A" : "O";
            let jobs = "";
            switch (i%5) {
            case 0:
                jobs="ITエンジニア";
                break;
            case 1:
                jobs="教師";
                break;
            case 2:
                jobs="デザイナー";
                break;
            case 3:
                jobs="アーティスト";
                break;
            case 4:
                jobs="事務員";
                break;
            default:
                jobs="ニート";
                break;
            }
            let email = `${i}@mail.com`;
            let phoneNum = i.toString();
            let len = 11 - phoneNum.length;
            for (let j=0; j<len;j++) {
                phoneNum = "0" + phoneNum;
            }
            await connection.query("\
            INSERT INTO users \
            (name, password, gender, date_of_birth, blood_type, jobs, email, phone_number, create_at, update_at) \
            VALUES \
            (?,?,?,?,?,?,?,?,NOW(),NOW())",
            [i.toString(), "pass" + i, gender, birth, blood, jobs, email, phoneNum]);
        }
        await connection.commit();
        res.status(201).send({ message: `ダミーデータを${num}個作成しました。`});
    } catch(err) {
        await connection.rollback();
        res.status(500).send({ error: err});
    } finally {
        connection.end();
        return;
    }
});

// データの削除
// body: none
// return: result or error message
app.delete(`/api/${apiVer}/allusers`, async(req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection(db_setting);
        await connection.beginTransaction();
        await connection.query("TRUNCATE table users");
        await connection.commit();
        res.status(200).send({ message: "全てのレコードを削除しました。"});
    } catch(err) {
        await connection.rollback();
        res.status(500).send({ error: err});
    } finally {
        connection.end();
        return;
    }
})
const port = process.env.PORT || 3000;

app.listen(port);

console.log("Listen on port http://localhost:" + port);
