CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role VARCHAR(20) NOT NULL
);

INSERT INTO users (username, password, role) VALUES
('admin', '1234', 'admin'),
('user', '1111', 'user')
ON DUPLICATE KEY UPDATE username=username;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

INSERT INTO products (name, price) VALUES
('Book', 120.00),
('Pen', 15.00),
('Notebook', 45.50)
ON DUPLICATE KEY UPDATE name=name;
