\connect tododb;
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at'
    ) THEN
        CREATE TRIGGER update_users_updated_at
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END$$;
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(50) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_todos_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'update_todos_updated_at'
    ) THEN
        CREATE TRIGGER update_todos_updated_at
        BEFORE UPDATE ON todos
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END$$;
INSERT INTO users (id, first_name, last_name, email, password, created_at, updated_at)
VALUES
(1, 'Dimitar', 'Georgievski', 'dimitar@gmail.com',
 '$2a$10$qcwEwSz7MNGg3vlmg7aWFeMUX/tFsgkqZvih8ZhYxbyj9jSPgBMdy',
 NOW(), NOW());
INSERT INTO todos (id, user_id, title, description, completed, created_at, updated_at)
VALUES
(1, 1, 'Call Mom', 'She will be grateful', false, NOW(), NOW()),
(2, 1, 'Walk dog', 'He will be happy', false, NOW(), NOW()),
(3, 1, 'Buy eggs', 'Need for lunch', false, NOW(), NOW()),
(4, 1, 'Go to work', 'At 8 AM', false, NOW(), NOW()),
(5, 1, 'Finish Homework', 'Todo App', false, NOW(), NOW()),
(6, 1, 'Start new Full-Stack Project', 'Management app for Gym', false, NOW(), NOW()),
(7, 1, 'Listen Music', 'New Rock Album', false, NOW(), NOW());
SELECT setval('users_id_seq', 1, true);
SELECT setval('todos_id_seq', 7, true);
