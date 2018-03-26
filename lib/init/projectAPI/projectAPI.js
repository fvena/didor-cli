/* eslint prefer-template: 0 */

const chalk    = require('chalk');             // Colorea las salidas del terminal
const inquirer = require('./inquirer');        // Cuestionarios para generar una API RESTful
const files    = require('../../utils/files'); // Herramientas para la gestión de archivos
const git      = require('../../utils/git');   // Herramientas para realizar acciones con GIT
const database = require('./databse');         // Herramientas para trabajar con la base de datos
const projects = require('config').get('repositories');
const pathExists = require('path-exists');   // Comprueba si existe un directorio


module.exports = {
  /**
   * Genera un proyecto API RESTful
   * @param  {Object}  project [Datos del proyecto]
   * @return {Boolean}         [Devuelve el resultado de generar el proyecto]
   */
  run: async (project) => {
    try {
      const projectName = project.name;
      const folderGitProject = `${projectName}/.git`;
      const projectType = projects.find(item => item.value === project.type);

      const validateFolder = await pathExists(projectName).then((exists) => {
        if (exists) {
          console.log(chalk.red('Error al generar el proyecto: ') + `Ya existe el directorio ${projectName}`);
          return false;
        }
        return true;
      });

      if (!validateFolder) { return false; }

      console.log('');
      console.log(chalk.green('Indica los datos para conectar con la base de datos:'));

      const databaseOptions = await inquirer.askDatabseDetails();

      console.log('');
      const tables = await database.getTablesNames(databaseOptions);
      console.log(tables);

      // console.log('');
      // console.log(chalk.green(`Inicializando el proyecto ${projectName}`));
      //
      // const cloneProject = await git.cloneProject(projectType.repo, projectName);
      // if (!cloneProject) { return false; }
      //
      // const addDotEnv = await files.generateDotEnvFile(projectName, databaseOptions);
      // if (!addDotEnv) { return false; }
      //
      // const removeFolder = await files.removeFolder(folderGitProject);
      // if (!removeFolder) { return false; }
      //
      // const initRepo     = await git.initRepo(projectName);
      // if (!initRepo) { return false; }

      return true;
    } catch (error) {
      console.log(chalk.red('Error al generar el proyecto:'));
      console.log(chalk.red(error));
      return false;
    }
  },
};
