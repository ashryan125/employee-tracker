USE employees;

-- DEPARTMENT SEEDS

INSERT into departments (name) VALUES ("Accounting");
INSERT into departments (name) VALUES ("HR");
INSERT into departments (name) VALUES ("IT");
INSERT into departments (name) VALUES ("Operations");
INSERT into departments (name) VALUES ("Sales");

-- roles SEEDS

INSERT into roles (title, salary, department_id) VALUES ("Accountant", 65000.00, 1);
INSERT into roles (title, salary, department_id) VALUES ("Engineer", 110000.00, 3);
INSERT into roles (title, salary, department_id) VALUES ("Human Resources", 90000.00, 2);
INSERT into roles (title, salary, department_id) VALUES ("Intern", 360000.00, 3);
INSERT into roles (title, salary, department_id) VALUES ("IT Manager", 150000.00, 3);
INSERT into roles (title, salary, department_id) VALUES ("Marketing", 75000.00, 4);
INSERT into roles (title, salary, department_id) VALUES ("Operations Manager", 125000.00, 4);
INSERT into roles (title, salary, department_id) VALUES ("Sales", 50000.00, 5);
INSERT into roles (title, salary, department_id) VALUES ("Sales Manager", 80000.00, 5);

-- EMPLOYEE SEEDS

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Smith', 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Aubrey', 'Walks', 3, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Bart', 'Simpson', 4, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Homer', 'Simpson', 2, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Marge', 'Simpson', 5, 8);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Arya', 'Stark', 8, 7);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Snow', 9, 8);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Tyrion', 'Lanister', 7, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Harry', 'Potter', 6, 8);


