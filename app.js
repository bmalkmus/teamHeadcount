const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
​const render = require("./lib/htmlRenderer");

let questions = 
    [
        { 
            type:'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type:'input',
            name: 'id',
            message: 'What is your Employee ID?',
            validate: function(value) {
                var pass = value.match(
                  /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
                );
                if (pass) {
                  return true;
                }
          
                return 'Please enter a valid ID number';
              }
        },
        {
            type:'input',
            name: 'email',
            message: 'What is your email address?'
        },
        {
            type:'list',
            name: 'role',
            message: 'What is your role within the company?',
            choices: ['Engineer', 'Intern', 'Manager']
        },
        {
            type:'input',
            name: 'github',
            message: 'What is your github username?',
            when: function (answers) {
                return answers.role === 'Engineer'
            }
        },
        {
            type:'input',
            name: 'school',
            message: 'What School are you attending?',
            when: function (answers) {
                return answers.role === 'Intern'
            }
        },
        {
            type:'input',
            name: 'office',
            message: 'What is your office number?',
            when: function (answers) {
                return answers.role === 'Manager'
            },
            // validate: function(value) {
            //     var pass = value.match(
            //       /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
            //     );
            //     if (pass) {
            //       return true;
            //     }
          
            //     return 'Please enter a valid office number';
            //   }
        },
        {
            type:'confirm',
            name: 'askAgain',
            message: 'Do you want to enter another employee (just hit enter for YES)?',
            default: true
        }
    ]

let Roster = []

function ask() {
    inquirer.prompt(questions)
    .then(answers => {
        let name = answers.name;
        let id = answers.id;
        let email = answers.email;
        let github = answers.github;
        let school = answers.school;
        let office = answers.office;
        if (answers.role === 'Engineer'){
            let employ = new Engineer (name, id, email, github);
            Roster.push(employ);
        }

        if (answers.role === 'Intern'){
            let employ = new Intern (name, id, email, school);
            Roster.push(employ);
        }

        if (answers.role === 'Manager'){
            let employ = new Manager (name, id, email, office);
            Roster.push(employ);
        }

        if (answers.askAgain == true) {
            console.log("-----------------------------------");
            ask();
        }

        else {
            console.log (Roster);
        }
    
        // Roster.push(answers);
        // console.log(Roster);
        // JSON.stringify(answers, null, '  ')
        // else{
        //     console.log(Roster);
        // }
    })
};

ask();
