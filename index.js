#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');   // Colorea las salidas
const clear = require('clear');   // Limpia el terminal
const figlet = require('figlet'); // Crea un título ASCII

const init = require('./lib/init');


// Limpia el terminal
clear();


// Muestra el saludo inicial
console.log(chalk.yellow(figlet.textSync('DIDOR', { horizontalLayout: 'full' })));
console.log(chalk.green(figlet.textSync('GENERATOR', { verticalLayout: 'full' })));


// Opciones de nuestro CLI
// didor -v
// didor -h
// didor init
program
  .version('0.0.1', '-v, --version')
  .option('init', 'Inicializa un proyecto')
  .option('option1', 'Opción 1')
  .option('option2', 'Opción 2');

// Menú de ayuda
program.on('--help', function(){
  console.log('');
  console.log('  Ejemplos:');
  console.log('');
  console.log('    $ didor -v');
  console.log('    $ didor init');
  console.log('    $ didor option1');
  console.log('    $ didor option2');
  console.log('');
});

program.parse(process.argv);


// Compruebo la opción elegida
if (program.init) {
  init.run();
} else if (program.option1) {
  console.log('Opción 1')
} else if (program.option2) {
  console.log('Opción 2')
} else {
  program.help();
}
