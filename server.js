const http = require('http'); // lib de suporte a http
const app = require('./app'); // importando o arquivo app.js
const port = process.env.port || 3000; // config porta
const server = http.createServer(app); // criando o server
server.listen(port); // config porta escutar