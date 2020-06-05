# User roles
INSERT INTO roles (role, description) VALUES('A', 'Administrador');
INSERT INTO roles (role, description) VALUES('T', 'Técnico');
INSERT INTO roles (role, description) VALUES('U', 'Usuário');

# Users
INSERT INTO users(username, password, email, avatar, first_name, last_name, id_role) values('admin', 'admin', 'admin@pandora.com', "http://localhost/public/assets/avatars/example_avatar.jpg", "Pandora", "System Administrator", 1); 
INSERT INTO users(username, password, email, avatar, first_name, last_name, id_role) values('tech', 'tech', 'tech@pandora.com', "http://localhost/public/assets/avatars/example_avatar.jpg",  "Tecnico", "Pandora", 2);
INSERT INTO users(username, password, email, avatar, first_name, last_name, id_role) values('daniel.munhoz', '123456', 'daniel@pandora.com', "http://localhost/public/assets/avatars/example_avatar.jpg",  "Daniel", "Costa Munhoz", 2); 
INSERT INTO users(username, password, email, avatar, first_name, last_name, id_role) values('diego.fernandes', '123456', 'diego@pandora.com', "http://localhost/public/assets/avatars/example_avatar.jpg",  "Diego", "Fernandes", 2); 
INSERT INTO users(username, password, email, avatar, first_name, last_name, id_role) values('filipe.d', '123456', 'filipe@pandora.com', "http://localhost/public/assets/avatars/example_avatar.jpg",  "Filipe", "Deschamps", 2); 
INSERT INTO users(username, password, email, avatar, first_name, last_name, id_role) values('robson.leite', '12356', 'robson@pandora.com', "http://localhost/public/assets/avatars/example_avatar.jpg", "Robson", "V. Leite", 3); 
INSERT INTO users(username, password, email, avatar, first_name, last_name, id_role) values('maike.brito', '123456', 'maike@pandora.com', "http://localhost/public/assets/avatars/example_avatar.jpg", "Maike", "Brito", 3); 

# Situations
INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('a fazer', true, false);
INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('em execução', false, false);
INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('aguardando', false, false);
INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('concluido', false, true);
INSERT INTO SITUATIONS(situation, `default`, concluded) VALUES('cancelada', false, false);

# Tags
INSERT INTO tags (title, background_color, foreground_color) VALUES ('sistema', '#d0d932', "#FFFFFF");
INSERT INTO tags (title, background_color, foreground_color) VALUES ('hardware', '#30d150', "#FFFFFF");
INSERT INTO tags (title, background_color, foreground_color) VALUES ('urgente', '#d93b3b', "#FFFFFF");
INSERT INTO tags (title, background_color, foreground_color) VALUES ('suporte', '#259dc4', "#FFFFFF");