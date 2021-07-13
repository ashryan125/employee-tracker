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

db.connect(function (err) {
  if (err) throw err;
  employeeApp();
});

let roleArr = [];
let managerArr = [];
let deptArr = [];

// new addition set ups

// GET ROLE - COMPLETE
const getRole = () => {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
};

// GET MANAGER - COMPLETE
const getManager = () => {
  const sql = `SELECT first_name, last_name FROM employees`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      managerArr.push(res[i].title);
    }
  });
  return managerArr;
};

// GET DEPARTMENT - COMPLETE
const getDepartment = () => {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      deptArr.push(res[i].title);
    }
  });
  return deptArr;
};

// Database Calls

// COMPLETE
const viewAllEmployees = () => {
  const sql = `SELECT employees.id AS ID, employees.first_name AS First_Name, employees.last_name AS Last_Name, 
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

// COMPLETE
const viewAllDepts = () => {
  const sql = `SELECT departments.id AS ID, departments.name AS Department FROM departments`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeApp();
  });
};

// COMPLETE
const viewAllRoles = () => {
  const sql = `SELECT roles.id AS ID, roles.title AS Title, departments.name AS Department, roles.salary AS Salary FROM roles
  INNER JOIN departments on departments.id = roles.department_id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeApp();
  });
};

// COMPLETE
const viewEmployeesByDept = () => {
  const sql = `SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name,
    departments.name AS Department FROM employees JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id ORDER BY departments.id`;

  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeApp();
  });
};

// COMPLETE
const viewEmployeesByRole = () => {
  const sql = `SELECT employees.first_name AS First_Name, employees.last_name AS Last_Name,
    roles.title AS Title FROM employees JOIN roles ON employees.role_id = roles.id ORDER BY roles.id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeApp();
  });
};

// COMPLETE
async function addEmployee() {
  const sql = `SELECT * FROM roles`;
  var roleChoices = [];
  db.query(sql, (err, res) => {
    if (err) throw err;
    roleChoices = res.map((roles) => ({
      value: roles.id,
      name: roles.title,
    }));
    db.query(`SELECT * FROM employees`, (err, res) => {
      if (err) throw err;
      var employeeChoices = [];
      employeeChoices = res.map((employees) => ({
        value: employees.id,
        name: `${employees.first_name} ${employees.last_name}`,
      }));
      employeeChoices.push({ value: null, name: "none" });

      inquirer
        .prompt([
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
            choices: roleChoices,
          },
          {
            type: "list",
            message: "Who is the employees's manager?",
            name: "manager",
            choices: employeeChoices,
          },
        ])
        .then((data) => {
          db.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${data.First_Name}", "${data.Last_Name}", "${data.role}", ${data.manager});`,
            function (err, res) {
              if (err) throw err;
              console.table(res);
              employeeApp();
            }
          );
        });
    });
  });
}

// COMPLETE
async function removeEmployee() {
  const sql = `SELECT * FROM employees`;
  var employeeList = [];
  db.query(sql, (err, res) => {
    if (err) throw err;
    employeeList = res.map((employees) => ({
      value: employees.id,
      name: `${employees.first_name} ${employees.last_name}`,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee do you want to remove?",
          name: "employeeName",
          choices: employeeList,
        },
      ])
      .then((data) => {
        db.query(
          `DELETE FROM employees WHERE employees.id = ${data.employeeName};`,

          function (err, res) {
            if (err) throw err;
            employeeApp();
          }
        );
      });
  });
}

// COMPLETE
async function addDepartment() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Name of the department?",
        name: "department",
      },
    ])
    .then(function (answers) {
      // currently returning name of added department as 0

      db.query(
        `INSERT into departments (name) VALUES ("${answers.department}");`,
        // {
        //     name: answers.department
        // },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          employeeApp();
        }
      );
    });
}

// COMPLETE
async function addRole() {
  // const departments = await addDepartment();
  const sql = `SELECT * FROM departments;`;
  var departmentChoices = [];
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.log(res);
    departmentChoices = res.map((department) => ({
      value: department.id,
      name: department.name,
    }));
    console.log(departmentChoices);

    inquirer
      .prompt([
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
          choices: departmentChoices,
        },
      ])
      .then((data) => {
        console.log(data);
        db.query(
          `INSERT into roles (title, salary, department_id) VALUES ("${data.roleName}", ${data.salary}, ${data.departmentName});`,

          function (err, res) {
            if (err) throw err;
            console.table(res);
            employeeApp();
          }
        );
      });
  });
}

// COMPLETE
async function updateEmployee() {
  const sql = `SELECT * FROM employees`;
  var employeeList = [];
  db.query(sql, (err, res) => {
    if (err) throw err;
    employeeList = res.map((employees) => ({
      value: employees.id,
      name: `${employees.first_name} ${employees.last_name}`,
    }));
    db.query(`SELECT * FROM roles`, (err, res) => {
      if (err) throw err;
      var roleChoices = [];
      roleChoices = res.map((roles) => ({
        value: roles.id,
        name: `${roles.title}`,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            message: "Which employee do you want to update?",
            name: "employeeName",
            choices: employeeList,
          },
          {
            type: "list",
            message: "What is the employee's new role?",
            name: "role",
            choices: roleChoices,
          },
        ])
        .then((data) => {
          db.query(
            `UPDATE employees SET role_id = ${data.role} WHERE id = ${data.employeeName};`,

            function (err, res) {
              if (err) throw err;
              console.table(res);

              employeeApp();
            }
          );
        });
    });
  });
}

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
}
