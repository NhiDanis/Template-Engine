const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const outputArr = [];
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
]