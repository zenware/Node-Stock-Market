CREATE TABLE User(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  password CHAR(53),
  UNIQUE KEY `username`(`username`)
)