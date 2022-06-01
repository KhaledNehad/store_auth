-- Create table users
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  username VARCHAR(50) NOT NULL,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);