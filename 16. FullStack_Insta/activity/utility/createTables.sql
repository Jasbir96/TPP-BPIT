CREATE TABLE IF NOT EXISTS user(
    uid VARCHAR(32) PRIMARY KEY,
    handle VARCHAR(30) NOT NULL UNIQUE,
    email_id VARCHAR(50) UNIQUE,
    phone BIGINT(10) UNIQUE,
    bio VARCHAR(150),
    is_verfied BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true,
    p_img_url VARCHAR(255) 
);
