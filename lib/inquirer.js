const inquirer = require('inquirer');
const files = require('./files');

module.exports = {
  askProjectDetails: () => {

    const questions = [
      {
        type: 'input',
        name: 'nameProject',
        message: 'Indica el nombre de tu proyecto:',
        default: files.getCurrentDirectoryBase(),
        validate: function( value ) {
          if (value.length) {
            if (/^([A-Za-z\-\_\d])+$/.test(value)) {
              return true;
            } else {
              return 'El nombre del proyecto solo puede contener letras, números y guiones medios y bajos';
            }
          } else {
            return 'Por favor, introduce el nombre de tu proyecto';
          }
        }
      },
      {
        type: 'list',
        name: 'typeProject',
        message: 'Selecciona que tipo de proyecto:',
        choices: [
          {
            name: 'API RESTful con Node/Express/MySQL',
            value: 'api-mysql'
          },
          {
            name: 'APP con Vue',
            value: 'app'
          }
        ],
        default: 'api-mysql'
      }
    ];

    return inquirer.prompt(questions);
  }
}
