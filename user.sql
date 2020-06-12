CREATE TABLE user(
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(50),
    last_name varchar(50),
    username varchar(50),
    password varchar(50),
    admin BOOLEAN,PRIMARY KEY(id));


INSERT INTO user(first_name,last_name,username,password,admin) VALUES("admin","admin","admin","admin",True);
