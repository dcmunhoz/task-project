CREATE DATABASE project_pandora DEFAULT CHARACTER SET = "utf8";

CREATE TABLE users (
	id_user INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(16) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	email VARCHAR(65) NOT NULL, 
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	CONSTRAINT pk_user PRIMARY KEY (id_user)
) CHARACTER SET utf8;

INSERT INTO users(username, password, email) values('dcmunhoz', 'teste', 'teste@email.com'); 