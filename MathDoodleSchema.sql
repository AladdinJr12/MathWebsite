CREATE DATABASE IF NOT EXISTS MathDoodle;

USE MathDoodle;

CREATE TABLE IF NOT EXISTS users (
	user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY(user_id)
);

INSERT INTO users (user_name, email, password)
VALUES
("Lois Lane", "loislane@gmail.com", "abc123"),
("John Doe", "johndoe@gmail.com", "def456"),
("Jane Doe", "janedoe@gmail.com", "ghi789");

-- Lessons have fk_topic_id that references Topics table --
CREATE TABLE IF NOT EXISTS topics (
	topic_id INT NOT NULL AUTO_INCREMENT,
    topic_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(topic_id)
);

INSERT INTO topics (topic_name)
VALUES
("Set Theory");