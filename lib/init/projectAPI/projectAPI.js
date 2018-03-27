/* eslint prefer-template: 0 */

const chalk    = require('chalk');             // Colorea las salidas del terminal
const inquirer = require('./inquirer');        // Cuestionarios para generar una API RESTful
const files    = require('../../utils/files'); // Herramientas para la gestión de archivos
const git      = require('../../utils/git');   // Herramientas para realizar acciones con GIT
const database = require('./database');         // Herramientas para trabajar con la base de datos
const projects = require('config').get('repositories');
const routes = require('./routes');
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

      // const validateFolder = await pathExists(projectName).then((exists) => {
      //   if (exists) {
      //     console.log(chalk.red('Error al generar el proyecto: ') + `Ya existe el directorio ${projectName}`);
      //     return false;
      //   }
      //   return true;
      // });
      //
      // if (!validateFolder) { return false; }

      console.log('');
      console.log(chalk.green('Indica los datos para conectar con la base de datos:'));

      const databaseOptions = await inquirer.askDatabseDetails();
      const query = await database.databaseQuery(databaseOptions,'SHOW TABLES');
      let tables = [];

      for (let index in query){
        tables.push(query[index].Tables_in_tickets);
      }

      // for (let index in query) {
      //   let table = {};
      //   table.name = query[index].Tables_in_tickets;
      //   table.checked = true;
      //   tables.push(table);
      // }

      // console.log('');
      // console.log(chalk.green('Indica las tablas sobre las que se generarán modelos:'));
      // const tablesSelected = await inquirer.askTables(tables);
      //
      // databaseOptions.tables = tablesSelected.tables;

      console.log('');
      console.log(chalk.green(`Generando el proyecto ${projectName}`));

      // const cloneProject = await git.cloneProject(projectType.repo, projectName);
      // if (!cloneProject) { return false; }
      //
      // const addDotEnv = await files.generateDotEnvFile(projectName, databaseOptions);
      // if (!addDotEnv) { return false; }
      //
      // const removeGitFolder = await files.removeFolder(folderGitProject);
      // if (!removeGitFolder) { return false; }
      //
      const generateModels = await database.generateModel(projectName, databaseOptions);
      if (!generateModels) { return false; }

      const moveModels = await files.moveModels(projectName);
      if (!moveModels) { return false; }

      const generateRoutes = await routes.generate(projectName, tables);
      if (!generateRoutes) { return false; }

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
