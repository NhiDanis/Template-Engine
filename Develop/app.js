const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const output = [];
const questions = [
    {
        type: 'list' ,
        name: 'role',
        message: "What is the employee role?",
        choices: ["Intern", "Engineer", "Manager"]
    },

    {
        type: 'input',
        name: 'name',
        message: "What is the employee's full name?",
    },

    {
        type: 'input',
        name: 'email' ,
        message: "What is the employee's emaill address?",
    },

    {
        type: 'input',
        name: 'id' ,
        message: "What is the employee's ID?" ,
    },

    {
        type: 'input',
        name: 'school',
        message: "Please enter the school that the intern attend?",
        when: function(answers){
            return answers.role === "Intern";
        }
    },

    {
        type: 'input',
        name: 'github',
        message: "Please enter the Github usename?",
        when: function(answers){
            return answers.role === "Engineer";
        }
    },

    {
        type: 'input',
        name: 'officenumber',
        message: "Please enter the office numbers?",
        when: function(answers){
            return answers.role === "Manager";
        }
    },

    {
        type: 'confirm',
        name: 'member',
        message: 'Please confirm would you like to add another member?'
    },
]

function teamUser() {
    inquirer.prompt(questions).then (answers => {
        output.push(answers)
            if(answers.member) {
                teamUser();
            }

            else {
                const team = output.map(employee => {
                    switch (employee.role) {
                        case "Intern":
                            return new Intern(employee.name, employee.id, employee.email, employee.school);

                        case "Manager":
                            return new Manager(employee.name, employee.id, employee.email, employee.officenumber);
                        
                        case "Engineer":
                            return new Engineer(employee.name, employee.id, employee.email, employee.github);

                        default: 
                            throw "Unknown Employee Role"
                    }
                });
    fs.writeFile(outputPath, render(team), err => {
        if (err) {
            throw (err)
        }
        
        console.log("SUCCESS!!")
        
        });
    
        }
    })
}

teamUser();