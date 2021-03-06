// server
const express = require("express");
const app = express();

// リクエストのボディをパースする設定
const bodyParser = require("body-parser");
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

const varidate = require("./varidate");

const apiVer = "v1";

/*
* 静的ファイルのホスティング
* app/static/
*/
const path = require("path");
app.use(express.static(path.join(__dirname, "static")));

/*
* APIの設定
*/

// 全てのユーザーデータを取得
// body: none, 
// return: userdata or error message
app.get(`/api/${apiVer}/users`, async(req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection(db_setting);
        let result = await connection.query(`SELECT id, name, gender, date_of_birth, blood_type, jobs, email, phone_number FROM users WHERE delete_at IS NULL`);
        // console.log(result[0]);
        const data = result[0]
        res.status(200).json(data);
    } catch(err) {
        res.status(500).send({error: err});
    } finally {
        connection.end();
        return;
    }
});

// 指定したユーザーデータの取得
// body: none, param: id
// return userdata selected from id or error message
app.get(`/api/${apiVer}/users/:id`, async(req, res) => {
    const id = req.params.id;
    let connection;
    try {
        connection = await mysql.createConnection(db_setting);
        let result = await connection.query(`SELECT id, name, gender, date_of_birth, blood_type, jobs, email, phone_number FROM users WHERE id=${id}`);
        const data = result[0];
        res.status(200).json(data);
    } catch(err) {
        res.status(500).send({error: err});
    } finally {
        connection.end();
        return;
    }
});

// ユーザーの登録
app.post(`/api/${apiVer}/users`, async(req, res) => {
    let check = 8;
    let errMsg = "";
    if (!varidate.name(req.body.name)) {
        check--;
        errMsg += "名前 ";
    }
    if (!varidate.gender(req.body.gender)) {
        check--;
        errMsg += "性別 ";
    }
    if (!varidate.dateOfBirth(req.body.date_of_birth)) {
        check--;
        errMsg += "生年月日 ";
    }
    if (!varidate.blood(req.body.blood_type)) {
        check--;
        errMsg += "血液型 ";
    }
    if (!varidate.jobs(req.body.jobs)) {
        check--;
        errMsg += "職業 ";
    }
    if (!varidate.email(req.body.email)) {
        check--;
        errMsg += "メールアドレス ";
    }
    if (!varidate.phoneNumber(req.body.phone_number)) {
        check--;
        errMsg += "電話番号 ";
    }
    if (!varidate.password(req.body.password)) {
        check--;
        errMsg += "パスワード ";
    }
    if (check !== 8) {
        res.status(400).send({error: `「${errMsg}」の入力に問題があります。`});
    } else {
        let connection;
        try {
            connection = await mysql.createConnection(db_setting);
            await connection.query(
                "\
                INSERT INTO users \
                (name, password, gender, date_of_birth, blood_type, jobs, email, phone_number, create_at, update_at) \
                VALUES \
                (?,?,?,?,?,?,?,?,NOW(),NOW())",
            [
                req.body.name,
                req.body.password,
                req.body.gender,
                req.body.date_of_birth,
                req.body.blood_type,
                req.body.jobs,
                req.body.email,
                req.body.phone_number
            ]);
            res.status(201).json({ message: "ユーザーを登録しました。"});
        } catch(err) {
            res.status(500).send({error: err});
        } finally {
            connection.end();
            return;
        }
    }
});

// ユーザー情報の更新
app.put(`/api/${apiVer}/users/:id`, async(req, res) => {

});

// ユーザーの削除
// body: none, param: id
// return message or error
app.delete(`/api/${apiVer}/users/:id`, async(req, res) => {
    const id = req.params.id;
    let connection;
    let data;
    // ユーザーの存在を確認
    try {
        connection = await mysql.createConnection(db_setting);
        let result = await connection.query(`SELECT * FROM users WHERE id=${id}`);
        data = result[0];
    } catch(err) {
        res.status(500).send({error: err});
    } finally {
        connection.end();
    }
    // ユーザーの削除
    if (data.length !== 1) {
        res.status(400).send({ error: `id:${id}に対応するユーザーが見つかりませんでした。`});
    } else {
        try {
            connection = await mysql.createConnection(db_setting);
            await connection.query(`UPDATE users SET delete_at=NOW() WHERE id=${id}`);
            res.status(200).send({ message: "ユーザーを削除しました。"});
        } catch(err) {
            res.status(500).send({ error: err});
        } finally {
            connection.end();
            return;
        }
    }
})

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