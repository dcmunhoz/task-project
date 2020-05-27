CREATE DATABASE project_pandora DEFAULT CHARACTER SET = "utf8";

set foreign_key_checks = 1;

CREATE TABLE users (
	id_user INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(16) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	first_name VARCHAR(60) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	birthday TIMESTAMP,
	email VARCHAR(65) NOT NULL,
	id_role INT NOT NULL, 
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	CONSTRAINT pk_user PRIMARY KEY (id_user)
) CHARACTER SET utf8;

CREATE TABLE situations(
	id_situation INT NOT NULL AUTO_INCREMENT,
	situation VARCHAR(60) NOT NULL,
	`default` BOOL DEFAULT FALSE,
	concluded BOOL DEFAULT FALSE,
	CONSTRAINT pk_situation PRIMARY KEY (id_situation) 
)CHARACTER SET utf8;

INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('a fazer', true, false);
INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('em execução', false, false);
INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('aguardando', false, false);
INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('concluido', false, true);
INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('cancelada', false, false);

CREATE TABLE tasks(
	id_task INT NOT NULL AUTO_INCREMENT,
	id_situation INT NOT NULL,
	title VARCHAR(60) NOT NULL,
	description VARCHAR(60) NOT NULL,
	id_user_creation INT NOT NULL,
	id_requester INT NOT NULL,
	estimated_start DATE,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
	CONSTRAINT pk_task PRIMARY KEY (id_task),
	CONSTRAINT fk_user_tasks1 FOREIGN KEY (id_user_creation) REFERENCES users(id_user),
	CONSTRAINT fk_user_tasks2 FOREIGN KEY (id_requester) REFERENCES users(id_user),
	CONSTRAINT fk_situation_task FOREIGN KEY (id_situation) REFERENCES situations(id_situation) 
) CHARACTER SET utf8;

CREATE TABLE roles(
	id_role INT NOT NULL AUTO_INCREMENT,
	role CHAR(1) NOT NULL,
	description VARCHAR(16) NOT NULL,
	CONSTRAINT pk_role PRIMARY KEY (id_role)
) CHARACTER SET utf8;

INSERT INTO roles (role, description) VALUES('A', 'Administrador');
INSERT INTO roles (role, description) VALUES('T', 'Técnico');
INSERT INTO roles (role, description) VALUES('U', 'Usuário');

INSERT INTO users(username, password, email, first_name, last_name, id_role) values('admin', 'admin', 'admin@pandora.com', "Pandora", "System Administrator", 1); 
