const Git    = require('nodegit');           // Framework para usar GIT
const gitKit = require('nodegit-kit');       // Simplifica realizar tareas con GIT
const ora    = require('ora');               // Spinner mientras se ejecutan tareas
const chalk    = require('chalk');             // Colorea las salidas del terminal


module.exports = {
  /**
   * Clona un repositorio dentro de un directorio
   * @param  {String}  gitRepo       [URL del repositorio de origen]
   * @param  {String}  projectFolder [Directorio del proyecto]
   * @return {Promise}               [Devuelve true si se ha clonado el repositorio o un error]
   */
  cloneProject: async (gitRepo, projectFolder) => {
    const spinner = ora('Descargando la plantilla').start();

    try {
      await Git
        .Clone(gitRepo, projectFolder)
        .then(() => {
          spinner.succeed();
        });

      return true;
    } catch (error) {
      spinner.fail('Error al inicializar el repositorio');
      console.log(chalk.red(error));
      return false;
    }
  },

  /**
   * Inicializa un repositorio
   * @param  {String}  projectFolder [Directorio del proyecto]
   * @return {Promise}               [Devuelve true si se ha iniciado el repositorio o un error]
   */
  initRepo: async (projectFolder) => {
    const spinner = ora('Incializando un nuevo repositorio').start();

    try {
      await gitKit
        .init(projectFolder, {
          bare: 0,
          commit: true,
          message: 'initial commit',
        })
        .then(() => {
          spinner.succeed();
        });

      return true;
    } catch (error) {
      spinner.fail('Error al inicializar el repositorio');
      console.log(chalk.red(error));
      return false;
    }
  },
};
