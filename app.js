const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// const validator = require('email-validator');
// const IDValidators = require('id-number-validator');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { empty } = require("rxjs");

let teamMembers = [];
let employeeID = 1;
let newEmployee;
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function appMenu(){
    createManager();
    
    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type:"input",
                name:"managerName",
                message:"What is your manager’s name?"
                //Validate user input
            },
            {
                type:"input",
                name:"managerId",
                message:"What is your manager’s id?",
                //Validate user input
                validate: function(id)
                {
                    valid = /^[0-9]/.test(id);
                    if (valid) {
                        return true;
                    }
                    else{
                        console.log("\nEnter valid Id");
                        
                        return false;
                    }
                }
            },
            {
                type:"input",
                name:"managerEmail",
                message: "What is your manager’s email address?",
                validate: function(email)
                {
                    valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                    if (valid) {
                        return true;
                    }
                    else{
                        console.log("\nEnter valid email");
                        
                        return false;
                    }
                }
                
            },
            {
                type:"input",
                name:"managerOfficeNum",
                message: "What is your manager’s office number?",
                //Validate user input
                validate: function(number)
                {
                    valid = /^[0-9]/.test(number);
                    if (valid) {
                        return true;
                    }
                    else{
                        console.log("\nEnter valid office number");
                        
                        return false;
                    }
                }
            },
            {
                type:"list",
                name:"moreEmployees",
                message: "Do you want to add more employees?",
                choices: ["Intern", "Engineer", "No"]
                //Validate user input
            },
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNum);
            console.log(manager);
            teamMembers.push(manager)
            if (answers.moreEmployees === "Intern") {
                createIntern();
            }
            else if (answers.moreEmployees === "Engineer") {
                createEngineer();
            }
            else {
                buildHTML();
            }

        });
    }
    function createEngineer() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type:"input",
                name:"engineerName",
                message:"What is your engineer’s name?"
                //Validate user input
            },
            {
                type:"input",
                name:"engineerId",
                message:"What is your engineer’s id",
                //Validate user input
                validate: function(id)
                {
                    valid = /^[0-9]/.test(id);
                    if (valid) {
                        return true;
                    }
                    else{
                        console.log("\nEnter valid Id");
                        
                        return false;
                    }
                }
                
            },
            {
                type:"input",
                name:"engineerEmail",
                message:"What is your engineer’s email address?",
                //Validate user input
                validate: function(email)
                {
                    valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                    if (valid) {
                        return true;
                    }
                    else{
                        console.log("\nEnter valid email");
                        
                        return false;
                    }
                }
            },
            {
                type:"input",
                name:"engineerGithub",
                message:"What is your engineer’s github account?"
                //Validate user input
            },
            {
                type:"list",
                name:"moreEmployees",
                message: "Do you want to add more employees?",
                choices: ["Intern", "Engineer", "No"],
                //Validate user input
            },
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            console.log(engineer);
            teamMembers.push(engineer)
            if (answers.moreEmployees === "Intern") {
                createIntern();
            }
            else if (answers.moreEmployees === "Engineer") {
                createEngineer();
            }
            else {
                buildHTML();
            }
        });
    }
    function createIntern() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type:"input",
                name:"internName",
                message:"What is your intern’s name?"
                
            },
            {
                type:"input",
                name:"internId",
                message:"What is your intern’s id",
                //Validate user input
                validate: function(id)
                {
                    valid = /^[0-9]/.test(id);
                    if (valid) {
                        return true;
                    }
                    else{
                        console.log("\nEnter valid Id");
                        
                        return false;
                    }
                }
            },
            {
                type:"input",
                name:"internEmail",
                message:"What is your intern’s email address?",
                // Validate email
                validate: function(email)
                {
                    valid = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(email);
                    if (valid) {
                        return true;
                    }
                    else{
                        console.log("\nEnter valid email");
                        
                        return false;
                    }
                }
            },
            {
                type:"input",
                name:"internSchool",
                message:"What is your intern's school?"
               
            },
            {
                type:"list",
                name:"moreEmployees",
                message: "Do you want to add more employees?",
                choices: ["Intern", "Engineer", "No"],
                
            },
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            console.log(intern);
            teamMembers.push(intern);
            if (answers.moreEmployees === "Intern") {
                createIntern();
            }
            else if (answers.moreEmployees === "Engineer") {
                createEngineer();
            }
            else {
                buildHTML();
            }
        });
    }

    function buildHTML() {
        console.log("buildinghtml")
        const newPage = render(teamMembers);
//    actually write the file
    fs.writeFile("./teamPage.html", newPage, (err) =>
    err ? console.log(err) : console.log('Success!')
);
    }

   
    
}


appMenu();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
