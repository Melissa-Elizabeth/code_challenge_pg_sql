-- Database name
treats
-- Document your create tables SQL here
CREATE TABLE treats (
	id SERIAL PRIMARY KEY,
	name VARCHAR(40) NOT NULL,
	description VARCHAR(240) NOT NULL,
	pic  VARCHAR(240)
);
