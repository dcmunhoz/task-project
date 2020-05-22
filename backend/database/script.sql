CREATE DATABASE project_pandora DEFAULT CHARACTER SET = "utf8";

CREATE TABLE users (
	id_user INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(16) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	first_name VARCHAR(60) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	birthday TIMESTAMP,
	email VARCHAR(65) NOT NULL, 
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	CONSTRAINT pk_user PRIMARY KEY (id_user)
) CHARACTER SET utf8;

INSERT INTO users(username, password, email, first_name, last_name) values('admin', 'admin', 'admin@pandora.com', "Pandora", "System Administrator"); 