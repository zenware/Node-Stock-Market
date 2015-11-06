CREATE TABLE Stock(
  id INT  NOT NULL AUTO_INCREMENT PRIMARY KEY
  symbol VARCHAR(12) NOT NULL,
  price DOUBLE NOT NULL,
  change_percent FLOAT,
  INDEX `symbol`(`symbol`)
)