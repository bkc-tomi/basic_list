CREATE DATABASE management;
use management;

CREATE TABLE users (
    id INT(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    gender VARCHAR(10),
    date_of_birth DATE,
    blood_type VARCHAR(2),
    jobs VARCHAR(250),
    email VARCHAR(250),
    phone_number VARCHAR(250),
    create_at TIMESTAMP,
    update_at TIMESTAMP,
    delete_at TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO users (name, password, gender, date_of_birth, blood_type, jobs, email, phone_number, create_at, update_at) VALUES 
("Subaru", "subaru0000", "男性", "2000-10-15", "B", "高校生", "subaru@gmail.com", "090XXXXYYYY", NOW(), NOW()),
("Emilia", "emilia0000", "女性", "2000-12-25", "A", "魔法使い", "emilia@gmail.com", "070XXXXYYYY", NOW(), NOW()),
("Rem", "rem0000", "女性", "2001-3-3", "A", "メイド", "rem@gmail.com", "080XXXXYYYY", NOW(), NOW());
