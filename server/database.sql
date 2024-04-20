CREATE DATABASE empdata;
CREATE TABLE employee(
    user_id uuid  PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN
);
CREATE TABLE feedback (
    feedback_id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES employee(user_id),
    title VARCHAR(255) NOT NULL,
    detail VARCHAR(255) NOT NULL
);
CREATE TABLE employee_det (
  user_id uuid REFERENCES employee(user_id),
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) NOT NULL,
  address TEXT NOT NULL,
  phone_number VARCHAR(10) NOT NULL,  -- This enforces 10 character limit
  employee_id SERIAL PRIMARY KEY
);

