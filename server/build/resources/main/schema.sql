DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS columns;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    user_id varchar(64),
    password varchar(64),
    token varchar(500)
);

CREATE TABLE columns (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    title varchar(64),
    user int references user(id),
    user_key int,
    previous_id bigint
);

CREATE TABLE card (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    note varchar(500),
    columns int references columns(id),
    columns_key int,
    previous_id bigint
);

ALTER TABLE user convert to charset utf8;
ALTER TABLE columns convert to charset utf8;
ALTER TABLE card convert to charset utf8;
