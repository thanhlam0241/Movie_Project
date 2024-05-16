CREATE DATABASE notification;
-- CREATE TABLE notifications  (
--     id serial primary key,
--     user_id INTEGER NOT NULL,
--     send_by VARCHAR(40) not null,
--     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     message VARCHAR NOT NULL
-- );
CREATE USER postgresql WITH PASSWORD 'password';

GRANT ALL PRIVILEGES ON DATABASE "notification" to postgresql;

