CREATE TABLE employees
(
    id SERIAL,
    name text,
    title text,
    CONSTRAINT employees_pkey PRIMARY KEY (id)
);

INSERT INTO employees(name, title) VALUES
 ('Mahoro Peace', 'Content Creator'),
 ('Kobusinge Shallon', 'Minister of Education'),
 ('Muhodari Sage', 'Full-stack Developer');