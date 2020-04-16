INSERT INTO board (created_time)
VALUES (CURRENT_TIMESTAMP);

INSERT INTO columns (title, created_time, board, board_key)
VALUES ('TODO', NOW(), 1, 0);
INSERT INTO columns (title, created_time, board, board_key)
VALUES ('DOING', CURRENT_TIMESTAMP, 1, 1);
INSERT INTO columns (title, created_time, board, board_key)
VALUES ('DONE', CURRENT_TIMESTAMP, 1, 2);

INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목1', '2번 내용',  1, 0);
INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목2', '2번 내용', 1, 1);
INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목3', '3번 내용', 1, 2);
INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목4', '4번 내용', 2, 0);
INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목5', '5번 내용', 2, 1);
INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목6', '6번 내용', 2, 2);
INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목7', '7번 내용', 2, 3);
INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목8', '8번 내용', 3, 0);
INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목9', '9번 내용', 3, 1);
INSERT INTO card (author, title, note, columns, columns_key)
VALUES ('iOS', '제목10', '10번 내용', 3, 2);
