var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load);    //autoload :quizId

//Definición de rutas de /quizes 
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);

//Ruta de créditos (ejercicio del modulo 6)
router.get('/views/author', quizController.author);

module.exports = router;
