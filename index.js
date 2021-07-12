const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// Connect to database
const db = mysql.createConnection(
    {
        host: "localhost",
        // mysql username
        user: "root",
        //sql password
        password: "password",
        database: "employees",
    },
    console.log("Connected to the election database")
);

// Database Calls
const viewAllEmployees = () => {
    const sql = `SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Title, roles.salary AS Salary, department.name AS Department, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.rolesID INNER JOIN department on department.id = roles.departmentID LEFT JOIN employees e on employees.managerID = e.id;`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        employeeApp();
    });
};

const viewAllDepts = () => {
    const sql = `SELECT department.id AS ID, department.name AS Department FROM department`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        employeeApp();
    });
};

const viewAllRoles = () => {
    const sql = `SELECT roles.id AS Dept_ID, roles.title AS Title FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        employeeApp();
    });
};

const viewEmployeesByDept = () => {
    const sql = `SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, department.name AS Department FROM employees JOIN roles ON employees.rolesID = roles.id JOIN department ON roles.departmentID = department.id ORDER BY department.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        employeeApp();
    });
};

const viewEmployeesByRole = () => {
    const sql = `SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, roles.title AS Title FROM employees JOIN roles ON employees.rolesID = role.id ORDER BY roles.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        employeeApp();
    });
};


async function addEmployee() {
    const manager = await getManager();
    const roles = await getRoles();
    return inquirer.prompt([
        {
            type: "input",
            name: "First_Name",
            message: "Employee's first name?",
        },
        {
            type: "input",
            name: "Last_Name",
            message: "Employee's last name?",
        },
        {
            type: "list",
            message: "Employee's role?",
            name: "role",
            choices: [
                // grabs role list from db
                ...roles,
            ],
        },
        {
            type: "list",
            message: "Who is the employees's manager?",
            name: "manager",
            choices: [
                // grabs list of managers from db
                ...managers,
            ],
        },
    ]);
};

async function removeEmployee() {
    const employees = await addEmployee();
    return inquirer.prompt([
        {
            type: "list",
            message: "Which employee do you want to remove?",
            name: "employeeName",
            choices: [
                // grab list of employees from db
                ...employees,
            ],
        },
    ]);
};

async function addDepartment() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Name of the department?",
            name: "department",
        },
    ]);
};

async function addRole() {
    const departments = await addDepartment();
    return inquirer.prompt([
        {
            type: "input",
            message: "Title of the new role?",
            name: "roleName",
        },
        {
            type: "input",
            message: "Salary of the new role?",
            name: "salary",
        },
        {
            type: "list",
            message: "Which department does this role belong to?",
            name: "departmentName",
            choices: [
                // generates departments from db
                ...departments,
            ],
        },
    ]);
};

async function updateEmployee() {
    const employees = await addEmployee();
    const roles = await addRole();
    return inquirer.prompt([
        {
            type: "list",
            message: "Which employee do you want to update?",
            name: "employeeName",
            choices: [
                // list of employees from db
                ...employees,
            ],
        },
        {
            type: "list",
            message: "What is the employee's new role?",
            name: "role",
            choices: [
                // list of roles from db
                ...roles,
            ],
        },
    ]);
};


// Inquirer Prompts
async function employeeApp() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Choose an action",
                name: "action",
                choices: [
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Remove Employee",
                    "Update Employee Role",
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "View All Employees By Deparment",
                    "View All Employees By Role",
                    "Exit",
                ],
            },
        ])
        .then(function (answers) {
            switch (answers.action) {
                // ADD A DEPARTMENT
                case "Add Department":
                    addDepartment();
                    break;

                // ADD A ROLE
                case "Add Role":
                    addRole();
                    break;

                // ADD EMPLOYEE
                case "Add Employee":
                    addEmployee();
                    break;

                // DELETE EMPLOYEE
                case "Remove Employee";
                    removeEmployee();
                    break;

                // UPDATE EMPLOYEE ROLE
                case "Update Employee Role":
                    updateEmployee();
                    break;

                // VIEW ALL DEPARTMENTS
                case "View All Departments":
                    viewAllDepts();
                    break;

                // VIEW ALL ROLES
                case "View All Roles":
                    viewAllRoles();
                    break;

                // VIEW ALL EMPLOYEES
                case "View All Employees":
                    viewAllEmployees();
                    break;

                // VIEW ALL EMPLOYES BY DEPT
                case "View All Employees by Department":
                    viewEmployeesByDept();
                    break;

                // VIEW EMPLOYEES BY ROLE
                case "View All Employees by Role":
                    viewEmployeesByRole();
                    break;

                //EXIT
                case "Exit":
                    connection.end();
                    break;
            }
        });
};