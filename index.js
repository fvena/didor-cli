#!/usr/bin/env node

process.env["NODE_CONFIG_DIR"] = __dirname + "/lib/config/";

const program = require('commander');   // Framework para desarrollar CLI
const chalk   = require('chalk');       // Colorea las salidas del terminal
const clear   = require('clear');       // Limpia el terminal
const figlet  = require('figlet');      // Crea un título ASCII

const init    = require('./lib/init/init');  // Herramientas para inicializar un proyecto


// Limpiar el terminal
clear();


// Muestra el saludo inicial
console.log(chalk.yellow(figlet.textSync('DIDOR', { horizontalLayout: 'full' })));
console.log(chalk.green(figlet.textSync('GENERATOR', { verticalLayout: 'full' })));


/****************************************************************
 * OPCIONES
 ****************************************************************/
program
  .version('0.0.1', '-v, --version')
  .option('init', 'Inicializa un proyecto')
  .option('option1', 'Opción 1')
  .option('option2', 'Opción 2');



/****************************************************************
 * MENÚ DE AYUDA
 ***************************************************************/
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



/****************************************************************
 * ACCIONES
 ***************************************************************/
if (program.init) {
  init.run();   // Inicializar un proyecto
} else if (program.option1) {
  console.log('Opción 1')
} else if (program.option2) {
  console.log('Opción 2')
} else {
  program.help();
}
