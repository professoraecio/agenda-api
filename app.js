const URL_BASE = '/api.agenda'; // URL do app (api rest)
const express = require('express'); // biblioteca principal
const app = express(); // o app usa recurso do construtor da biblioteca principal
const morgan = require('morgan'); // configurando meu depurador (debug do projeto)
app.use(morgan('dev')); // configurando o app para usar o debug mode
const bodyParser = require('body-parser'); // para facilitar o parse dos itens da request
app.use(bodyParser.urlencoded({extended : false})); // app usar o body parser
app.use(bodyParser.json()); // somente aceito json como parametros

// rotas

const contatoDao = require('./rotas/contatoDao');
app.use(URL_BASE + '/contato-dao',contatoDao);


// http://localhost:3000/api.agenda
app.use(URL_BASE,(req,res,next) => {
    res.status(200).send({
        response : 'URL padrão do app funcionou!'
    });
});

app.use((req,res,next) => {
    const erro = new Error('Erro 404, rota não encontrada!');
    erro.status = 404;
    next(erro);
});

module.exports = app;