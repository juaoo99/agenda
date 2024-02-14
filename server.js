require('dotenv').config();

// Inicializando o express
const express = require('express');
const mongoose = require('mongoose');

const app = express(); // Defina app aqui antes de usar qualquer middleware que dependa dele

// Conexão com o MongoDB
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conectado à base de dados');
        app.emit('pronto'); // Emitir evento quando a conexão estiver pronta
    })
    .catch(err => console.error('Erro na conexão com a base de dados:', err));

// Trabalhando com sessões no projeto
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');
const path = require('path');

// Middleware sendo importado
const { meuMiddleware, checkCsrferror, csrfMiddleware } = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// Configurando sessão
const sessionOptions = session({
    secret: 'joaopedro9918',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});

app.use(sessionOptions);
app.use(flash());
app.use(express.static('./public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(csrf());
app.use(meuMiddleware);
app.use(csrfMiddleware);
app.use(checkCsrferror); // Corrigindo o nome do middleware
// Para o express usar as rotas
const route = require('./routes');
app.use(route);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('Servidor está rodando na porta 3000');
        console.log('Acessando http://localhost:3000');
    });
});
