const chalk = require('chalk'); // Colorea las salidas del terminal
const path = require('path');   // Herramienta para gestionar las rutas de los archivos
const del = require('del');     // Herramienta para eliminar archivos y directorios
const ora = require('ora');     // Spinner mientras se ejecuta una acción
const fs = require('fs');       // Herramienta para trabajar con archivos

module.exports = {
  /**
   * Obtiene el nombre del directorio actual
   * @return {String} [Nombre del directorio actual]
   */
  getCurrentDirectoryBase: () => path.basename(process.cwd()),


  /**
   * Elimina un directorio de forma recursiva
   * @param  {Object}  folder [Ruta del directorio]
   * @return {Promise}        [Devuelve el resultado de eliminar el directorio]
   */
  removeFolder: async (folder) => {
    const spinner = ora('Borrando el repositorio de la plantilla').start();

    try {
      await del(folder)
        .then(() => {
          spinner.succeed();
        });

      return true;
    } catch (error) {
      spinner.fail('Error al borrar el directorio .git');
      console.log(chalk.red(error));
      return false;
    }
  },


  /**
   * Añade el archivo .env con los datos de configuración de la base de datos
   */
  generateDotEnvFile: async (project, database) => {
    const spinner = ora('Generando el archivo .env').start();

    try {
      const folder = `${project}/.env`;
      let env = 'NODE_ENV=dev/n';
      env += 'PORT=3000/n';
      env += '/n';
      env += 'DB_DIALECT=mysql/n';
      env += `DB_HOST=${database.host}/n`;
      env += `DB_PORT=${database.port}/n`;
      env += `DB_USER=${database.user}/n`;
      env += `DB_PASSWORD=${database.password}/n`;
      env += `DB_DATABASE=${database.name}/n`;

      await fs.appendFileSync(folder, env);
      spinner.succeed();
      return true;
    } catch (error) {
      spinner.fail('Error al generar el archivo .env');
      console.log(chalk.red(error));
      return false;
    }
  },


  moveModels: async (project)  => {
    const spinner = ora('Generando la estructura del proyecto').start();

    try {
      const modelPath = `${project}/models`;

      await fs.readdirSync(modelPath)
        .forEach(file => {
          let directory = file.split('.')
          let destPath = `${project}/server/api/v1/${directory[0]}`;
          fs.mkdirSync(destPath);
          fs.renameSync(`${modelPath}/${file}`,`${destPath}/${directory[0]}.model.js`)
        })

      fs.rmdirSync(modelPath);

      spinner.succeed();
      return true;
    } catch (error) {
      spinner.fail('Error al generar la escructura del proyecto');
      console.log(chalk.red(error));
      return false;
    }
  }
};
