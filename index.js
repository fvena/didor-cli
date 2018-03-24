const chalk = require('chalk');   // Colorea las salidas
const clear = require('clear');   // Limpia el terminal
const figlet = require('figlet'); // Crea un título ASCII

const inquirer = require('./lib/inquirer');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('DIDOR', { horizontalLayout: 'full' })
  )
);

console.log(
  chalk.green(
    figlet.textSync('API GEN', { verticalLayout: 'full' })
  )
);

const run = async () => {
  try {
    const options = await inquirer.askProjectDetails();

    console.log(options);
  } catch(err) {
    if (err) {
      console.log(err);
    }
  }
}

run();
