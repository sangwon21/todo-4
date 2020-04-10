insert into user(user_id, password) values ('hamill', '1234');

insert into columns(title, user, user_key, previous_id) values ('해야할일', 1, 0, NULL);
insert into columns(title, user, user_key, previous_id) values ('하는중', 1, 1, 0);
insert into columns(title, user, user_key, previous_id) values ('다했어', 1, 2, 1);

insert into card(note, columns, columns_key, previous_id) values ('맛있는 김치볶음밥', 3, 0,  NULL);
insert into card(note, columns, columns_key, previous_id) values ('재밌는 코드스쿼드', 3, 1,  0);
insert into card(note, columns, columns_key, previous_id) values ('투두앱만들기~', 3, 2,  1);

insert into card(note, columns, columns_key, previous_id) values ('맛없어', 2, 0,  NULL);
insert into card(note, columns, columns_key, previous_id) values ('슬기로운 깜빵생활', 2, 1,  0);
insert into card(note, columns, columns_key, previous_id) values ('히히헤헤', 2, 2,  1);

insert into card(note, columns, columns_key, previous_id) values ('떡순이', 1, 0,  NULL);
insert into card(note, columns, columns_key, previous_id) values ('떡돌이', 1, 1,  0);
insert into card(note, columns, columns_key, previous_id) values ('떡튀순', 1, 2,  1);
