DROP DATABASE IF EXISTS metabus;
create database metabus default charset utf8mb4;
use metabus;


create table `USERS` (
    `mobileid` VARCHAR(11) NOT NULL UNIQUE,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`mobileid`)
);

create table `USERFOLLOW` (
    `idx` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `stickerid` VARCHAR(20) NOT NULL,
    `followerid` VARCHAR(11) NOT NULL,
    PRIMARY KEY (`idx`),
    CONSTRAINT `STICKER_FOLLOWER` FOREIGN KEY (`followerid`) REFERENCES `USERS` (`mobileid`) ON UPDATE CASCADE
);

create table `STICKER` (
    `stickerid` VARCHAR(20) NOT NULL UNIQUE,
    `mobileid` VARCHAR(11) NOT NULL,
    `originname` VARCHAR(255) NOT NULL,
    `filename` VARCHAR(255) NOT NULL,
    `auth` INT NULL,
    `gps` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`stickerid`),
    CONSTRAINT `STICKER_MAKER` FOREIGN KEY (`mobileid`) REFERENCES `USERS` (`mobileid`) ON UPDATE CASCADE
);

INSERT INTO USERS (mobileid) VALUES ('01012341234');