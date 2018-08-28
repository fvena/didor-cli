const serveStatic = require('serve-static');
const connect     = require('connect');
const livereload  = require('connect-livereload');
const lrserver    = require('livereload');
const open        = require('opn');
const chalk       = require('chalk');
const path        = require('path');
const pathExists  = require('path-exists');   // Comprueba si existe un directorio
const _           = require('lodash');
const { renderTemplateFile } = require('template-file');

/**
 * Inicializa un servidor local para ver la documentación
 * @param  {string}  docs           [Docs path]
 * @param  {boolean} openInBrowser  [Open docs in default browser]
 * @param  {integer} port           [Listen Port]
 * @param  {integer} livereloadPort [Livereload Listen Port]
 */
module.exports = async (configPath) => {
  try {
    const defaultConfig = {
      docs: '/docs',
      open: false,
      port: '3000',
      livereload_port: '35729',
      name: 'Didor',
      logo: '../../src/assets/logo.svg',
      homepage: 'home.md',
      sassVar: '/static/sassVar.json',
      demo: {
        css: '/static/didor.css',
      },
    };
    const configFile = require(process.cwd() + configPath); // eslint-disable-line
    const config = _.merge({}, defaultConfig, configFile.docs);


    // Compruebo si existe el directorio con la documentación
    const validateDocsFolder = await pathExists(process.cwd() + config.docs).then(exists => exists);

    if (!validateDocsFolder) {
      console.log(`${chalk.red('Error al generar la documentación:')} No se encuentra el directorio ${config.docs}`);
      return false;
    }

    // Renderizo la plantilla con los datos recibidos
    const template = path.join(__dirname, '../templates/docs/index.html');
    const index = await renderTemplateFile(template, config).then(renderedString => renderedString);

    // Creo el servidor
    const server = connect();
    server.use(livereload({ port: config.livereloadPort }));
    server.use((req, res, next) => {
      if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(index);
        res.end();
      } else {
        next();
      }
    });
    server.use(serveStatic(path.join(__dirname, '../templates/docs')));
    server.listen(config.port);

    lrserver.createServer({
      exts: ['md'],
      exclusions: ['node_modules/'],
      port: config.livereloadPort,
    }).watch(config.docs);

    if (config.open) {
      open(`http://localhost:${config.port}`);
    }

    const msg = `\nServing ${chalk.green(config.docs)} now.\nListening at ${chalk.green(`http://localhost:${config.port}`)}.\n`;
    console.log(msg);

    return true;
  } catch (error) {
    if (error) {
      console.log(chalk.red('Ha ocurrido un error'));
      console.log(error);
    }

    return false;
  }
};
