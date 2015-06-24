// GET /quizes/question
exports.question = function(req, res) {
  res.render('quizes/question', {pregunta: 'Capital de Francia'})  ;
};

//GET /quizes/answer
exports.answer = function(req, res) {
  if (req.query.respuesta === 'París')   {
      res.render('quizes/answer', {respuesta: 'Correcto'});
  } else {
      res.render('quizes/answer', {respuesta: 'Incorrecto'});
  }
};

//GET /author
exports.author = function(req, res) {
  res.render('author', {desarrollador: 'José Ramón Santos', fotoDes: '<img src="/images/pic.jpg"  width=50px height=60px>',
                        ideaOriginal: 'Juan Quemada Vives', fotoIO: '<img src="/images/juanQuemada.jpg"  width=60px height=60px>'
  });
  
}