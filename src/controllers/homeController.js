const Contato = require('../models/ContatoModel');



exports.index = async(req, res) => {
    //a função render é quem esta renderizando no navegador
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos });
};