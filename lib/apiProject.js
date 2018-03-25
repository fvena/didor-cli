const Git = require('nodegit');
const chalk = require('chalk');   // Colorea las salidas
const ora = require('ora');


module.exports = {
  cloneProject: async (nameProject) => {
    const spinner = ora('Descargando la plantilla').start();

    try {
      await Git
        .Clone("https://github.com/fvena/didor-restful-mysql-boilerplate.git", nameProject)
        .then((repository) => {
          spinner.succeed();
          return true;
        });
    } catch (error) {
      throw new Error("Error al descargar el repositorio: " + error);
    }
  },

  initRepo: async (nameProject) => {
    const spinner = ora('Incializando un nuevo repositorio').start();

    try {
      await Git
        .Repository.init(nameProject, 0).then(function (repo) {
          spinner.succeed();
          return true;
        });
    } catch (error) {
      throw new Error("Error al inicializar el repositorio: " + error);
    }
  }
}
