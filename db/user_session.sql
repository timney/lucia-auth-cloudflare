CREATE TABLE user_session
(
	id             VARCHAR(127) NOT NULL PRIMARY KEY,
	user_id        VARCHAR(15)  NOT NULL,
	active_expires BIGINT       NOT NULL,
	idle_expires   BIGINT       NOT NULL,
	FOREIGN KEY (user_id) REFERENCES user (id)
);
