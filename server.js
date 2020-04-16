const inquirer = require('inquirer');
const mysql = require('mysql');
var util = require('util');

var connection = mysql.createConnection({
    host: "localhost",


    port: 3306,


    user: "root",


    password: "America1!",
    database: "employeeDB"
});
connection.connect(function (err) {
    if (err) throw err;
    start();
});


var starting_prompts = [{
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: ["Add an employee?", "Add a department?", "Add a role?", "View Departments?", "View Roles?",
        "View Employees?", "Nothing, Im done."]
}

]

var newEmployeePrompts = [
    {
        type: "input",
        name: "first_name",
        message: "Enter new employee first name:"
    },
    {
        type: "input",
        name: "last_name",
        message: "Enter new employee last name: "
    },
    {
        type: "input",
        name: "role_id",
        message: "Enter new employees role id: "
    },
    {
        type: "input",
        name: "managers",
        message: "Enter the new employees managers name : "
    }
];

var newDepartmentPrompts = [
    {
        type: "input",
        name: "department",
        message: "Enter new department name: "
    }
];

var addRolePrompts = [
    {
        type: "input",
        name: "role_id",
        message: "Enter new roles id number:"
    },
    {
        type: "input",
        name: "salary",
        message: "Enter the salary for the new role: "
    },
    {
        type: "input",
        name: "department",
        message: "Enter the department for the new role: "
    }
];

function start() {
    inquirer.prompt(starting_prompts)
        .then(function (answer) {
            if (answer.action === "Add an employee?") {
                addEmployees();
            }
            if (answer.action === "Add a department?") {
                addDepartment();
            }
            if (answer.action === "Add a role?") {
                addRole();
            }
            if (answer.action === "View Departments?") {
                viewDepartments();
            }
            if (answer.action === "View Employees?") {
                viewEmployees();
            }
            if (answer.action === "View Roles?") {
                viewRoles();
            }
            if (answer.action === "Nothing, Im done.") {
                console.log("Thanks for using the employee tracker");
                
            } 
        }) 
}

async function addEmployees() {
   await inquirer.prompt(newEmployeePrompts)
        .then(function (data) {
            connection.query("INSERT INTO employees SET ?",
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    role_id: data.role_id,
                    manager: data.managers
                })

        }) 
start();
}

async function addDepartment() {
    await inquirer.prompt(newDepartmentPrompts)
        .then(function (data) {
            connection.query("INSERT INTO department SET ?",
                {
                    department: data.department,

                })

        })
start();
}

async function addRole() {
   await inquirer.prompt(addRolePrompts)
        .then(function (data) {
            connection.query("INSERT INTO role SET ?",
                {
                   
                    role_id: data.role_id,
                    salary: data.salary,
                    department: data.department


                })

        })
start();
}

 function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, results) {
        if (err) throw err; {
            console.table(results);
        }
    });
    
}

 function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        {
            console.table(results);
        }
    });
  
}

 function viewRoles() {
    connection.query("SELECT * FROM role", function (err, results) {
        if (err) throw err; {
            console.table(results);
        }
    });
  
}
