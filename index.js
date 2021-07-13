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
    console.log("Connected to the employees database")
);

db.connect(function(err) {
    if (err) throw err;
    employeeApp();
});

let roleArr = [];
let managerArr = [];
let deptArr = [];

// new addition set ups
const getRole = () => {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
};

const getManager = () => {
    const sql = `SELECT first_name, last_name FROM employees`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            managerArr.push(res[i].title);
        }
    })
    return managerArr;
};

const getDepartment = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            deptArr.push(res[i].title);
        }
    })
    return deptArr;
};

// Database Calls
const viewAllEmployees = () => {
    const sql = `SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name, 
    roles.title AS Title, roles.salary AS Salary, departments.name AS Department, 
    CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on
    roles.id = employees.role_id INNER JOIN departments on departments.id = roles.department_id
    LEFT JOIN employees e on employees.manager_id = e.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeApp();
    });
};

const viewAllDepts = () => {
    const sql = `SELECT departments.id AS ID, departments.name AS Department FROM departments`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeApp();
    });
};

const viewAllRoles = () => {
    const sql = `SELECT roles.id AS Dept_ID, roles.title AS Title FROM roles`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeApp();
    });
};

const viewEmployeesByDept = () => {
    const sql = `SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name,
    departments.name AS Department FROM employees JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id ORDER BY departments.id`;

    db.query(sql, (err, res) => {
        console.log('before err');
        if (err) throw err;
        console.log(res);
        console.table(res);
        employeeApp();
    });
};

const viewEmployeesByRole = () => {
    const sql = `SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name,
    roles.title AS Title FROM employees JOIN roles ON employees.role_id = roles.id ORDER BY roles.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeApp();
    });
};


async function addEmployee() {
    const manager = await getManager();
    const roles = await getRole();
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
            name: "department"
        }
    ]).then(function(answers) {
        db.query(`INSERT INTO DEPARTMENTS (name) VALUES (?)`,
            {
                name: "answers.name"
            },
            function(err, res) {
                if (err) throw err;
                console.table(res)
                employeeApp();
            }
        )
    }) 
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
                case "Remove Employee":
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

                // VIEW ALL EMPLOYEES BY DEPT
                case "View All Employees By Deparment":
                    viewEmployeesByDept();
                    break;

                // VIEW EMPLOYEES BY ROLE
                case "View All Employees By Role":
                    viewEmployeesByRole();
                    break;

                //EXIT
                case "Exit":
                    db.end();
                    break;
            }
        });
};