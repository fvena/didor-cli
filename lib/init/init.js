const chalk      = require('chalk');        // Colorea las salidas del terminal
const inquirer   = require('./inquirer');   // Cuestionario para inicializar proyectos
const projectAPI = require('./projectAPI/projectAPI'); // Herramientas para generar una API RESTful


module.exports = {
  /**
   * Inicializa la creación de un proyecto
   * @return {Promise} [Devuelve el resultado de crear un proyecto]
   */
  run: async () => {
    try {

      console.log(chalk.green('Indica los datos de tu proyecto:'));

      // Pide al usuario los datos del proyecto
      const project = await inquirer.askProjectDetails();


      // Ejecuto una acción según el tipo de proyecto
      switch (project.type) {
        case 'api-mysql':
          return projectAPI.run(project);;
          break;
        case 'app':
          console.log('Inicializar un proyecto app');
          return true;
          break;
        default:
          console.log(chalk.red('El tipo de proyecto no es válido'));
          return false;
      }
    } catch(error) {
      if (error) {
        console.log(chalk.red('Ha ocurrido un error'));
        console.log(error);
      }
    }
  }
};
