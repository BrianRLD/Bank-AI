-- DATABASE SCHEMA: Bank Assistant

-- ===========================
--  ENUMS
-- ===========================
CREATE TYPE user_role AS ENUM ('client', 'employee', 'admin');
CREATE TYPE user_status AS ENUM ('active', 'inactive');
CREATE TYPE account_type AS ENUM ('checking', 'savings', 'credit');
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal', 'transfer', 'payment');
CREATE TYPE sender_type AS ENUM ('user', 'bot', 'employee');

-- ===========================
--  TABLE: users
-- ===========================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role user_role DEFAULT 'client',
    status user_status DEFAULT 'active',
    created_at TIMESTAMP DEFAULT now()
);

-- ===========================
--  TABLE: accounts
-- ===========================
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    account_type account_type NOT NULL,
    balance DECIMAL(12,2) DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT now()
);

-- ===========================
--  TABLE: transactions
-- ===========================
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(id) ON DELETE CASCADE,
    amount DECIMAL(12,2) NOT NULL,
    type transaction_type NOT NULL,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT now()
);

-- ===========================
--  TABLE: chats
-- ===========================
CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150),
    created_at TIMESTAMP DEFAULT now()
);

-- ===========================
--  TABLE: messages
-- ===========================
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    chat_id INT REFERENCES chats(id) ON DELETE CASCADE,
    sender sender_type NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- ===========================
--  TABLE: permissions (opcional)
-- ===========================
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    can_view_clients BOOLEAN DEFAULT false,
    can_manage_transactions BOOLEAN DEFAULT false,
    can_access_ai BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now()
);
