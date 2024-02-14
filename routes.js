const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const contatoController= require('./src/controllers/contatoController');



route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);
module.exports = route;

//essa é uma aula sobre middlewares com express e webapack
//o express é baseado em middlewares
//middlewares sao funções que estao entre coisas

//com o parametro next eu determino o que deve acontecer apos o middleware, no caso, depois da minha funcao o que vai acontecer é mostrar minha homeController.paginaInicial