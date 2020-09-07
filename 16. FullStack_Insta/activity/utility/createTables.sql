-- 1. GO to mysql client
-- 2. create database  insta_pp;
-- 3. create sql script 
-- 4. go back to mysql 
        -- type source sqlscript path 
        -- to check=> show tables
CREATE TABLE IF NOT EXISTS user(
    uid VARCHAR(80) PRIMARY KEY,
    handle VARCHAR(30) NOT NULL UNIQUE,
    email_id VARCHAR(50) UNIQUE,
    phone BIGINT(10) UNIQUE,
    bio VARCHAR(150),
    is_verfied BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    p_img_url VARCHAR(255) 
);
CREATE TABLE IF NOT EXISTS user_follower(
    user_id VARCHAR(80) NOT NULL,
    follower_id VARCHAR(80) NOT NULL,
    is_pending BOOLEAN DEFAULT true,
    INDEX (user_id)
);
