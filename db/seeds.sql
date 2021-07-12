USE employees;

-- DEPARTMENT SEEDS

INSERT into department (name) VALUES ("Accounting");
INSERT into department (name) VALUES ("HR");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Operations");
INSERT into department (name) VALUES ("Sales");

-- ROLE SEEDS

INSERT into role (title, salary, department_id) VALUES ("Accountant", 65000, 1); --1
INSERT into role (title, salary, department_id) VALUES ("Engineer", 110000, 3); --2
INSERT into role (title, salary, department_id) VALUES ("Human Resources", 90000, 2); --3
INSERT into role (title, salary, department_id) VALUES ("Intern", 360000, 3); --4
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 150000, 3); --5
INSERT into role (title, salary, department_id) VALUES ("Marketing", 75000, 4); --6
INSERT into role (title, salary, department_id) VALUES ("Operations Manager", 125000, 4); --7
INSERT into role (title, salary, department_id) VALUES ("Sales", 50000, 5); --8
INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 80000, 5); --9

-- EMPLOYEE SEEDS

INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('John', 'Smith', 1, null);  --accountant
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Aubrey', 'Walks', 3, null); -- human resources
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Bart', 'Simpson', 4, 5; -- intern
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Homer', 'Simpson', 2, 5); -- engineer 
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Marge', 'Simpson', 5, 8); -- it manager
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Arya', 'Stark', 8, 7); -- sales
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('John', 'Snow', 9, 8); --sales manager
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Tyrion', 'Lanister', 7, null); --operations manager
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Harry', 'Potter', 6, 8); --marketing


