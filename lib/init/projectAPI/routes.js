const chalk = require('chalk'); // Colorea las salidas del terminal
const ora = require('ora');     // Spinner mientras se ejecuta una acción
const fs = require('fs');       // Herramienta para trabajar con archivos
const mkdirp = require('mkdirp');
const find = require('find');


module.exports = {
  generate: async (projectName) => {
    const spinner = ora('Generando las rutas').start();

    try {
      const modelPath = `${projectName}/models`;
      const controllerTemplate = await fs.readFileSync(__dirname+'/templates/baseRouter.js', "utf8", function (error, data) { return data });
      const routerTemplate = await fs.readFileSync(__dirname+'/templates/baseRouterIndex.js', "utf8", function (error, data) { return data });

      const Listfiles = await find.eachfile(/\model.js$/, `${projectName}/server/api/v1`, (file) => {
        const fileName = getFileName(file);
        const fileData = fs.readFileSync(file, 'utf8');
        const postData = getPostData(fileName, fileData);
        const routerNameObject = prepareRouteNameObject(fileName, postData);
        const controllerPath = file.slice(0, -9) + '.controller.js';

        let controller = controllerTemplate;

        for (let key in routerNameObject) {
          let stringToReplace = "{{routeName." + key + "}}";
          controller = controller.replace(new RegExp(stringToReplace, 'g'), routerNameObject[key]);
        }

        fs.appendFileSync(controllerPath,controller);
      })

      // await fs.readdirSync(modelPath)
      //   .forEach(file => {
      //     fs.readFile(`${modelPath}/${file}`, "utf8", function (err, fileData) {
      //       if (err) { console.log(chalk.red("\n  The model named " + file + ".js doesn't exist !")); }
      //
      //       filePath =file.split('.');
      //       filename = filePath[0];
      //       const postData = getPostData(filename, fileData);
      //       const routerNameObject = prepareRouteNameObject(filename, postData);
      //       const destPath = `${projectName}/server/api/v1/${filename}`;
      //
      //       let controller = controllerTemplate;
      //
      //       for (let key in routerNameObject) {
      //         let stringToReplace = "{{routeName." + key + "}}";
      //         controller = controller.replace(new RegExp(stringToReplace, 'g'), routerNameObject[key]);
      //       }
      //
      //       fs.mkdirSync(destPath);
      //       fs.appendFileSync(`${destPath}/${filename}.controller.js`,controller);
      //
      //       console.log(controller);
      //       // fs.readFile(__dirname+'/templates/baseRouter.js', "utf8", function (baseErr, baseFileData) {
      //       //   for (let key in routerNameObject) {
      //       //     let stringToReplace = "{{routeName." + key + "}}";
      //       //     baseFileData = baseFileData.replace(new RegExp(stringToReplace, 'g'), routerNameObject[key]);
      //       //   }
      //       //
      //       //   fs.readFile(__dirname+'/base/baseRouterIndex.js', "utf8", function (baseRouterIndexErr, baseRouterIndexFileData) {
      //       //     mkdirp('./router', function (err) {
      //       //       fs.readFile('./router/' + filename + '.js', "utf8", function (fileError, fileExist) {
      //       //         fs.readFile('./router/index.js', "utf8", function (indexErr, indexFile) {
      //       //           if(indexErr){
      //       //             fs.appendFile('./router/index.js', baseRouterIndexFileData, function (err) {
      //       //               if (err) console.log("\n  error, try again...\n", err);
      //       //               indexFile = baseRouterIndexFileData;
      //       //             });
      //       //           }
      //       //           if (fileError) {
      //       //             fs.appendFile('./router/' + filename + '.js', baseFileData, function (err) {
      //       //               if (err) console.log("\n  error, try again...\n", err);
      //       //               addRouterIndexRequire(indexFile, filename);
      //       //             });
      //       //           } else {
      //       //             console.log("\n  " + filename + ".js was selected !\n");
      //       //
      //       //             let exist = [
      //       //               {
      //       //                 type: 'list',
      //       //                 name: 'exist',
      //       //                 message: 'Route named ' + filename + ' already exist.\n  Do you want to erase and generate it again ? (DANGER):',
      //       //                 choices: [
      //       //                   "yes",
      //       //                   "no"
      //       //                 ]
      //       //               }
      //       //             ];
      //       //
      //       //             inquirer.prompt(exist).then(answers => {
      //       //               let isExist = answers.exist;
      //       //               if (isExist === "yes") {
      //       //                 fs.writeFile('./router/' + filename + '.js', baseFileData, function (err) {
      //       //                   if (err) console.log("\n  error, try again...\n", err);
      //       //                   addRouterIndexRequire(indexFile, filename);
      //       //                 });
      //       //               } else {
      //       //                 console.log("\n  Ok, it's maybe a good choice ;)");
      //       //               }
      //       //
      //       //             });
      //       //           }
      //       //         })
      //       //       })
      //       //     })
      //       //   })
      //       // })
      //     })
      //   })

      spinner.succeed();
      return true;
    } catch (error) {
      spinner.fail('Error al generar las rutas');
      console.log(chalk.red(error));
      return false;
    }
  }
}


function getFileName(path){
  const parts = path.split('/');
  const file = parts[parts.length - 1];
  const filePart = file.split('.');
  return filePart[0];
}

String.prototype.capitalize = function () {
  return this.replace(/(^|\s)([a-z])/g, function (m, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};


function addRouterIndexRequire(indexFile, routerName){
  let beginString = "const routes = [",
      String = indexFile.substring(indexFile.lastIndexOf(beginString) + beginString.length + 1 , indexFile.lastIndexOf("];")),
      newString = [];

  String = String.trim().split();

  let includeString = "require('./"+routerName+"')";
  if(!String.toString().includes(includeString)){
    if(String && String[0] !== "]"){
      newString = String.slice();
      newString.push("\n  require('./"+routerName+"')");
    }else{
      newString.push("\n  require('./"+routerName+"')");
      newString = newString.toString() + "\n]";
    }
    indexFile = indexFile.replace(String, newString);
    fs.writeFile('./router/index.js', indexFile, function (err) {
      console.log("\n  The route " + routerName + '.js was create with success :)');
    });
  }else{
    console.log("\n  The route " + routerName + '.js was create with success :)');
  }
}


function getPostData(routerName, fileData) {

  let beginString = "sequelize.define('"+routerName+"', {";
  let String = fileData.substring(fileData.lastIndexOf(beginString) + beginString.length + 1 , fileData.lastIndexOf("}, {"));
  let arrayOfItem = String.match(/\S+(?=: {)/g);
  let postItems = '';
  let arrayLength = arrayOfItem.length;

  for(let i = 0; i < arrayLength; i++){
    postItems += arrayOfItem[i]+": req.body."+arrayOfItem[i];
    if(i !== arrayLength - 1) {
      postItems += ",\n\t\t\t";
    }
  }
  return postItems;
}


function prepareRouteNameObject(routerName, postData){
  let singular = routerName;

  let lastChar = routerName.substr(routerName.length - 1);
  if(lastChar === 's'){
    singular = routerName.substring(0, routerName.length - 1);
  }

  return {
    singular: singular,
    singularCap: singular.capitalize(),
    singularUp: singular.toUpperCase(),
    plurial: routerName,
    plurialCap: routerName.capitalize(),
    plurialUp: routerName.toUpperCase(),
    postData: postData
  }
}
