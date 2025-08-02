CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    age INTEGER,
    name VARCHAR(500),
    role CHAR(15)
);

INSERT INTO users (age, name, role)
VALUES
(25, '田中健也', 'admin');
