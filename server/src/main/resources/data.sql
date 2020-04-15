# insert into user(user_id, password) values ('hamill', '1234');

INSERT INTO board (created_time)
VALUES (CURRENT_TIMESTAMP);

INSERT INTO columns (title, created_time, board, board_key)
VALUES ('TODO', NOW(), 1, 0);
INSERT INTO columns (title, created_time, board, board_key)
VALUES ('DOING', CURRENT_TIMESTAMP, 1, 1);
INSERT INTO columns (title, created_time, board, board_key)
VALUES ('DONE', CURRENT_TIMESTAMP, 1, 2);

INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('1번 내용', NOW(), 1, 0);
INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('2번 내용', NOW(), 1, 1);
INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('3번 내용', NOW(), 1, 2);
INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('4번 내용', NOW(), 2, 0);
INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('5번 내용', NOW(), 2, 1);
INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('6번 내용', NOW(), 2, 2);
INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('7번 내용', NOW(), 2, 3);
INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('8번 내용', NOW(), 3, 0);
INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('9번 내용', NOW(), 3, 1);
INSERT INTO card (note, created_time, columns, columns_key)
VALUES ('10번 내용', NOW(), 3, 2);
