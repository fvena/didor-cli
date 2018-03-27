const inquirer = require('inquirer');

module.exports = {
  /**
   * Solicita al usuario datos de la base de datos
   * @return {Object} [Datos de la base de datos]
   */
  askDatabseDetails: () => {
    const questions = [
      {
        type: 'input',
        name: 'host',
        message: 'Host:',
        default: 'localhost',
      },
      {
        type: 'input',
        name: 'port',
        message: 'Puerto:',
        default: '3306',
      },
      {
        type: 'input',
        name: 'user',
        message: 'Usuario:',
        default: 'root',
      },
      {
        type: 'input',
        name: 'password',
        message: 'Contraseña:',
        default: 'Airzone00',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Base de Datos:',
        default: 'tickets',
        validate: (value) => {
          if (value.length) {
            return true;
          }
          return 'Por favor, introduce el nombre de la base de datos';
        },
      },
    ];

    return inquirer.prompt(questions);
  },

  /**
   * Solicita al usuario datos de la base de datos
   * @return {Object} [Datos de la base de datos]
   */
  askTables: (tables) => {
    const questions = [
      {
        type: 'checkbox',
        name: 'tables',
        message: 'Selecciona las tablas',
        choices: tables
      }
    ];

    return inquirer.prompt(questions);
  },
};
