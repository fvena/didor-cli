const chalk = require('chalk');   // Colorea las salidas

const files = require('./files');
const inquirer = require('./inquirer');
const apiProject = require('./apiProject');

module.exports = {
  run: async () => {
    try {
      const options = await inquirer.askProjectDetails();
      const nameProject = options.nameProject;
      const folderGitProject = nameProject + '/.git';

      switch (options.typeProject) {
        case 'api-mysql':
          console.log('');
          console.log(chalk.green('Inicializando el proyecto ' + nameProject));

          const cloneProject = await apiProject.cloneProject(nameProject);
          const removeFolder = await files.removeFolder(folderGitProject);
          const initRepo = await apiProject.initRepo(nameProject);
          break;
        case 'app':
          console.log('Inicializar un proyecto app')
          break;
        default:
          console.log(chalk.red('El proyecto no es válido'))
      }
    } catch(error) {
      if (error) {
        console.log(chalk.red('Ha ocurrido un error'));
        console.log(error);
      }
    }
  }
};
