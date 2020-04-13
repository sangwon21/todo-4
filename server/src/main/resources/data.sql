# insert into user(user_id, password) values ('hamill', '1234');

INSERT INTO board (created_time) VALUES (CURRENT_TIMESTAMP);

INSERT INTO columns (title, created_time, board, board_key) VALUES ("TODO", CURRENT_TIMESTAMP , 1, 0);
INSERT INTO columns (title, created_time, board, board_key) VALUES ("DOING", CURRENT_TIMESTAMP, 1, 1);
INSERT INTO columns (title, created_time, board, board_key) VALUES ("DONE", CURRENT_TIMESTAMP, 1, 2);


