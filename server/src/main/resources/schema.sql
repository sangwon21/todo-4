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
    id        BIGINT PRIMARY KEY AUTO_INCREMENT,
    title     VARCHAR(64),
    board     INT REFERENCES board (id),
    board_key INT
);

CREATE TABLE card
(
    id          BIGINT PRIMARY KEY AUTO_INCREMENT,
    author      VARCHAR(10),
    title       VARCHAR(10),
    note        VARCHAR(500),
    columns     INT REFERENCES columns (id),
    columns_key INT
);

CREATE TABLE history
(
    id                   BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_action           VARCHAR(64),
    contents             VARCHAR(64),
    suffix               VARCHAR(64),
    history_created_time DATETIME
);

