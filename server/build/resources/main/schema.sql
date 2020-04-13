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
    id           BIGINT PRIMARY KEY AUTO_INCREMENT,
    note         VARCHAR(500),
    created_time DATETIME,
    columns      INT REFERENCES columns (id),
    columns_key  INT
);

CREATE TABLE history
(
    id            BIGINT PRIMARY KEY AUTO_INCREMENT,
    nickname      VARCHAR(64),
    action        VARCHAR(64),
    acting_column VARCHAR(64),
    moved_column  VARCHAR(64),
    changed_time  DATETIME,
    contents      VARCHAR(64),
    board         INT REFERENCES board (id),
    board_key     INT
);

