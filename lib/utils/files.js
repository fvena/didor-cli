const chalk = require('chalk');   // Colorea las salidas del terminal
const path = require('path');     // Herramienta para gestionar las rutas de los archivos
const del = require('del');       // Herramienta para eliminar archivos y directorios
const ora = require('ora');       // Spinner mientras se ejecuta una acción

module.exports = {
  /**
   * Obtiene el nombre del directorio actual
   * @return {String} [Nombre del directorio actual]
   */
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },


  /**
   * Elimina un directorio de forma recursiva
   * @param  {Object}  folder [Ruta del directorio]
   * @return {Promise}        [Devuelve el resultado de eliminar el directorio]
   */
  removeFolder: async(folder) => {
    const spinner = ora('Borrando el repositorio de la plantilla').start();

    try {
      await del(folder)
        .then((paths) => {
          spinner.succeed();
        });

      return true;
    } catch (error) {
      spinner.fail('Error al borrar el directorio .git');
      console.log(chalk.red(error));
    }
  }
};
