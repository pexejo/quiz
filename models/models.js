var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);
            
//Importar la difinición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; //exportar definición de la tabla Quiz

// sequelice.sync() crea e inicializa la tabla de preguntas en DB
sequelize.sync().success(function() {
   //success(..) ejecuta el manejador una vez creada la tabla
   Quiz.count().success(function(count) {
      if(count===0) { // la tabla se inicializa solo si está vacía
      Quiz.create({
                    pregunta: 'Capital de Italia',
                    respuesta: 'Roma'
                 });
      Quiz.create({
                    pregunta: 'Capital de Portugal',
                    respuesta: 'Lisboa'
                 }); 
      Quiz.create({
                    pregunta: 'Capital de Inglaterra',
                    respuesta: 'Londres'
                 });
      Quiz.create({
                    pregunta: 'Capital de Hungría',
                    respuesta: 'Budapest'
                 })                  
        .then(function(){console.log('Base de datos inicializada.')});
      }
   });
});