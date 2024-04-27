const fs = require('fs');
const path = require('path');

function criarPasta(pasta) {
  if (!fs.existsSync(pasta)) {
      fs.mkdirSync(pasta, { recursive: true });
      console.log(`Pasta criada: ${pasta}`);
  } else {
      console.log(`Pasta já existe: ${pasta}`);
  }
}
function criarArquivo(arquivo, conteudo) {
  fs.writeFileSync(arquivo, conteudo);
  console.log(`Arquivo criado: ${arquivo}`);
}

const packageJson = `{
  "name": "back",
  "version": "1.0.0",
  "description": "",
  "main": "src/app.js",
  "bin": {
    "back": "bin/server.js"
  },
  "scripts": {
    "start": "nodemon app.js"
  },
  "keywords": [],
  "author": "Guilherme Barreto",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "consign": "^0.1.6",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mysql": "^2.18.1"
  }
}`
const appJs = `
var app = require('./bin/server')
const port = 

app.listen(port, function () {
  console.log("Servidor ON: http://localhost:port")
})
`
const serverJs = `const express =  require('express')
const consign = require('consign')
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
  
consign()
  .then('bin/dbConnection.js')
  .then('src/routes')
  .then('src/models')
  .then('src/controllers')
  .into(app);

module.exports = app;
`
const dbConnectionJs = `
const mysql = require('mysql')

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Gui132*&*',
  database: 'gb',
};

const connection = mysql.createConnection(dbConfig);


module.exports = connection;
`
const routesJs = `
module.exports = function(app){

  app.get('/teste', function (req, res, next) {
    app.src.controllers.controller.teste(app, req, res, next)
  });
}
`
const controllerJs = `
const model = require('../models/model');

model.teste()

module.exports.teste = (app, req, res, next) => {
  res.status(200).send({
    title: "Guilherme Barreto",
    version: "0.0.1"
  });
}
exports.post = (req, res, next) => {
  res.status(201).send('Requisição recebida com sucesso!');
};
exports.put = (req, res, next) => {
  let id = req.params.id;
  console.log(id)
  res.status(201).send("Requisição recebida com sucesso!");
};
exports.delete = (req, res, next) => {
  let id = req.params.id;
  console.log(id)
  res.status(200).send("Requisição recebida com sucesso!");
};

`
const modelJs = `
let connection = require('../../bin/dbConnection')
const model = {};

model.teste = () => console.log('Amigo estou aqui! models/modeljs');

model.get = (param = null, callback) => {
  if(param){
   console.log(param)
  } else{
    connection.query('SELECT * FROM <bd> WHERE <param> = ?', [param], callback)
  }
};

module.exports = model;
`

criarPasta('bin');
criarPasta('src');
criarPasta('src/controllers');
criarPasta('src/models');
criarPasta('src/routes');

criarArquivo('package.json', packageJson);
criarArquivo('app.js', appJs);
criarArquivo('bin/server.js', serverJs );
criarArquivo('bin/dbConnection.js',dbConnectionJs);
criarArquivo('src/routes/routes.js', routesJs);
criarArquivo('src/controllers/controller.js', controllerJs);
criarArquivo('src/models/model.js', modelJs);
criarArquivo('.gitignore', 'node_modules/')