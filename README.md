# employee-tracker
## Description
An application that can be used to track and manage a company's employees

## Table of Contents

* [Built With](#built-with)
* [Installation](#installation)
* [Usage](#usage)
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Video of App in Action](#video)

## Built With
* HTML
* CSS / Bootstrap
* JavaScript
* Node.js
* Express.js

## Installation
Clone the Github repo.
```https://github.com/ashryan125/employee-tracker.git```

Once in the properly cloned folder, run ```npm install``` to install the following dependencies:
 * Inquirer:  ```npm i inquirer``` to use inquirer.js for question generation
 * MySQL2: ```npm i mysql2``` to use mysql2 for database queries
 * Console Table ```npm i console.table``` for an easy to read console log
 * Alernatively, you can run all at once with ```npm install inquirer mysql2 console.table```


## Usuage
 #### **LOCAL USAGE:** 
 Enter ```npm start``` in your command line and press ```ENTER```.  
 
## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
  
## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

```

## Video
![Employee Tracker App gif](#)