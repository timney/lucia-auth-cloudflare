CREATE TABLE user_key
(
	id              VARCHAR(255) NOT NULL PRIMARY KEY,
	user_id         VARCHAR(15)  NOT NULL,
	hashed_password VARCHAR(255),
	FOREIGN KEY (user_id) REFERENCES user (id)
);
