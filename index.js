const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = new Database({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "password",
    database: "db"
  });