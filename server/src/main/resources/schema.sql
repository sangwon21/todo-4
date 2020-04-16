DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS columns;
DROP TABLE IF EXISTS board;

CREATE TABLE board
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    created_time DATETIME
);

CREATE TABLE columns
(
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    title        VARCHAR(64),
    created_time DATETIME,
    board        INT REFERENCES board (id),
    board_key    INT
);

CREATE TABLE card
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(10),
    note        VARCHAR(500),
    author      VARCHAR(10),
    columns     INT REFERENCES columns (id),
    columns_key INT
);

CREATE TABLE history
(
    id                   BIGINT PRIMARY KEY AUTO_INCREMENT,
    contents             VARCHAR(64),
    history_created_time DATETIME
);

