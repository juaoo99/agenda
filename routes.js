const express = require('express');
const route = express.Router();

const loginController = require('./src/controllers/loginController');
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');
const { loginRequired } = require('./src/middlewares/middleware.js');


route.get('/', homeController.index);

route.get('/login/index', loginController.index);

route.post('/login/register', loginController.register);

route.post('/login/login', loginController.login);

route.get('/login/logout', loginController.logout);

route.get('/contato/index', loginRequired, contatoController.index);

route.post('/contato/register', loginRequired, contatoController.register);

route.get('/contato/index/:id', loginRequired, contatoController.editIndex);

module.exports = route;