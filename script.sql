create database ticket;


use ticket;

CREATE TABLE user (
 id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
 id_tipouser int(11) NOT NULL,
 nombre VARCHAR(50) NOT NULL,
 mail VARCHAR(50) NOT NULL,
 password VARCHAR(50) NOT NULL
);


CREATE TABLE ticket (
 id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
 id_user int(11) NOT NULL,
 ticket_pedido VARCHAR(200) NOT NULL,
 FOREIGN KEY (id_user) REFERENCES user(id) 
);


CREATE TABLE tipo_usuario (
 id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(200)
);

ALTER TABLE user 
 ADD CONSTRAINT FOREIGN KEY (id_tipouser) 
  REFERENCES tipo_usuario(id);
  

 ALTER TABLE user MODIFY COLUMN mail VARCHAR(200) NOT NULL UNIQUE;

 INSERT INTO tipo_usuario(nombre) VALUES('USER');
 INSERT INTO tipo_usuario(nombre) VALUES('ADMIN');
 
--  $2a$10$Ll01WptNwLAdVcA0lyu.Xe.BNtugwRE7EZaCdqLlQulHMpUQi5DIG // 123456
 INSERT INTO user(id_tipouser, nombre, mail, password) VALUES(2, 'admin', 'admin@mail.com', '$2a$10$Ll01WptNwLAdVcA0lyu.Xe.BNtugwRE7EZaCdqLlQulHMpUQi5DIG');