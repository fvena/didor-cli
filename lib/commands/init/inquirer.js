const inquirer = require('inquirer');
const files    = require('../utils/files');
const projects = require('config').get('repositories');

module.exports = {
  /**
   * Solicita al usuario datos del proyecto
   * @return {Object} [Datos del proyecto]
   */
  askProjectDetails: () => {


    const questions = [{
        type: 'list',
        name: 'type',
        message: 'Selecciona que tipo de proyecto:',
        choices: projects,
        default: 'api-mysql'
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nombre de tu proyecto:',
        validate: function(value) {
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
        type: 'input',
        name: 'description',
        message: 'Descripción:'
      }
    ];

    return inquirer.prompt(questions);
  }
}
