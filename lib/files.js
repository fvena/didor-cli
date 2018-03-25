const chalk = require('chalk');   // Colorea las salidas
const path = require('path');
const del = require('del');
const ora = require('ora');

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  removeFolder: async(folder) => {
    const spinner = ora('Borrando el repositorio de la plantilla').start();

    try {
      await del(folder)
        .then((paths) => {
          spinner.succeed();
          return true;
        });
    } catch (error) {
      throw new Error("Error al borrar el directorio .git: " + error);
    }
  }
};
