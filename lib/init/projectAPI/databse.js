const ora    = require('ora');               // Spinner mientras se ejecutan tareas
const chalk    = require('chalk');             // Colorea las salidas del terminal
const SequelizeAuto = require('sequelize-auto');
const mysql      = require('mysql');

module.exports = {
  getTablesNames: async (database) => {
    try {
      const connection = mysql.createConnection({
        host: database.host,
        user: database.user,
        password: database.password,
        database: database.name,
        port: database.port,
      });


      let tables;
      connection.connect();

      connection.query('SHOW TABLES', (error, results) => {
        if (error) console.log(chalk.red(error));
        tables = results;
      });

      connection.end();

      let tablesArray = []

      for (let table in tables) {
        tables.push(tables[table].Tables_in_tickets);
      }

      return tablesArray;
    } catch (error) {
      console.log(chalk.red(error));
      return false;
    }
  },

  generateModel: async (projectFolder, database) => {
    const spinner = ora('Generando modelos a partir de la base de datos').start();

    try {
      const auto = new SequelizeAuto(database.name, database.user, database.password, {
        host: database.host,
        dialect: 'mysql',
        port: database.port,
        additional: {
          timestamps: false,
        },
        tables: ['table1', 'table2', 'table3'],
      });

      await auto.run((err) => {
        if (err) throw err;

        console.log(auto.tables); // table list
        console.log(auto.foreignKeys); // foreign key list
        return true;
      });
      return false;
    } catch (error) {
      spinner.fail('Error al generar los modelos');
      console.log(chalk.red(error));
      return false;
    }
  },
};
