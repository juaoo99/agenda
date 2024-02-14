
exports.paginaInicial = (req, res) => {
    //a função render é quem esta renderizando no navegador
    res.render('index', {
        titulo: 'Titulo',
        numeros: [0, 1, 2, 3, 4]
    });
    return;
};

exports.trataPost = (req, res) => {
   res.send(req.body);
   return;
};