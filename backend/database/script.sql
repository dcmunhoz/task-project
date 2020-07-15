CREATE DATABASE project_pandora DEFAULT CHARACTER SET = "utf8";

set foreign_key_checks = 0;

CREATE TABLE roles(
	id_role INT NOT NULL AUTO_INCREMENT,
	role CHAR(1) NOT NULL,
	description VARCHAR(16) NOT NULL,
	CONSTRAINT pk_role PRIMARY KEY (id_role)
) CHARACTER SET utf8;

CREATE TABLE users (
	id_user INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(16) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
    avatar VARCHAR(100),
	first_name VARCHAR(60) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	birthday TIMESTAMP,
	email VARCHAR(65) NOT NULL,
	id_role INT NOT NULL, 
	status BOOL NOT NULL DEFAULT TRUE, 
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	CONSTRAINT pk_user PRIMARY KEY (id_user),
    CONSTRAINT fk_role FOREIGN KEY (id_role) REFERENCES roles(id_role)
) CHARACTER SET utf8;

CREATE TABLE situations(
	id_situation INT NOT NULL AUTO_INCREMENT,
	situation VARCHAR(60) NOT NULL,
	`default` BOOL DEFAULT FALSE,
	concluded BOOL DEFAULT FALSE,
    excluded BOOL DEFAULT FALSE,
	CONSTRAINT pk_situation PRIMARY KEY (id_situation) 
)CHARACTER SET utf8;

INSERT INTO SITUATIONS(situation, `default`, concluded, excluded) VALUES('a fazer', true, false, false);
INSERT INTO SITUATIONS(situation, `default`, concluded, excluded) VALUES('em execução', false, false, false);
INSERT INTO SITUATIONS(situation, `default`, concluded, excluded) VALUES('aguardando', false, false, false);
INSERT INTO SITUATIONS(situation, `default`, concluded, excluded) VALUES('concluido', false, true, false);
INSERT INTO SITUATIONS(situation, `default`, concluded, excluded) VALUES('cancelada', false, false, true);

CREATE TABLE tasks(
	id_task INT NOT NULL AUTO_INCREMENT,
	id_situation INT NOT NULL,
	title VARCHAR(60) NOT NULL,
	description TEXT NOT NULL,
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

CREATE TABLE tags(
	id_tag INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(16) NOT NULL,
    background_color VARCHAR(7) DEFAULT "#AAAAAA",
    foreground_color VARCHAR(7) DEFAULT "#AAAAAA",
    CONSTRAINT pk_tag PRIMARY KEY (id_tag)
) CHARACTER SET utf8;

CREATE TABLE taskxmembers(
	id_taskxmember INT NOT NULL AUTO_INCREMENT,
    id_task INT NOT NULL,
    id_user INT NOT NULL,
    CONSTRAINT pk_taskxmember PRIMARY KEY(id_taskxmember),
    CONSTRAINT fk_task_taskxmember FOREIGN KEY (id_task) REFERENCES tasks(id_task),
    CONSTRAINT fk_user_taskxmember FOREIGN KEY (id_user) REFERENCES users(id_user) ,
    UNIQUE idx_taskxmember (id_task, id_user)
) CHARACTER SET utf8;

CREATE TABLE taskxtags(
	id_taskxtags INT NOT NULL AUTO_INCREMENT,
    id_task INT NOT NULL,
    id_tag INT NOT NULL,
    PRIMARY KEY (id_taskxtags),
    FOREIGN KEY (id_task) REFERENCES tasks(id_task),
    FOREIGN KEY (id_tag) REFERENCES tags(id_tag)
) CHARACTER SET utf8;

ALTER TABLE taskxtags
	ADD FOREIGN KEY (id_task) REFERENCES tasks(id_task)
	ON DELETE CASCADE;

ALTER TABLE taskxtags
	ADD FOREIGN KEY (id_tag) REFERENCES tags(id_tag)
	ON DELETE CASCADE;

CREATE TABLE messages(
	id_message INT NOT NULL AUTO_INCREMENT,
    id_task INT NOT NULL,
    id_user INT NOT NULL,
    conclusion BOOL DEFAULT FALSE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT pk_messages PRIMARY KEY(id_message),
    CONSTRAINT fk_task FOREIGN KEY (id_task) REFERENCES tasks(id_task),
    CONSTRAINT fk_user FOREIGN KEY (id_user) REFERENCES users(id_user)
) CHARACTER SET utf8;
