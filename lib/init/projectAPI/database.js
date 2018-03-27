const ora    = require('ora');               // Spinner mientras se ejecutan tareas
const chalk    = require('chalk');             // Colorea las salidas del terminal
const SequelizeAuto = require('sequelize-auto');
const mysql      = require('mysql');

module.exports = {
  databaseQuery: (database, query) => {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection({
        host: database.host,
        user: database.user,
        password: database.password,
        database: database.name,
        port: database.port,
      });

      connection.connect();
      connection.query(query, (error, data) => (error ? reject(error) : resolve(data)));
      connection.end();
    })
  },

  generateModel: (projectFolder, database) => {
    const spinner = ora('Generando Modelos').start();
    return new Promise((resolve, reject) => {
      let auto = new SequelizeAuto(database.name, database.user, database.password, {
        host: database.host,
        dialect: 'mysql',
        port: database.port,
        additional: {
          timestamps: false,
        },
        tables: database.tables,
        logging: false,
        directory: `${projectFolder}/models`,
      });

      auto.run((error) => {
        if (error) {
          spinner.fail('Error al generar modelos');
          reject(error);
        }
        spinner.succeed();
        resolve(true);
      });
    })
  },
};
