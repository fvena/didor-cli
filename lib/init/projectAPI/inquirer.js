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
        default: '',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Base de Datos:',
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
};
