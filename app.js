const inquirer = require("inquirer");

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
inquirer.prompt(questions)
    .then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
});