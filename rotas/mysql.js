const mysql = require('mysql');
const nodemon = require('./nodemon.json');

var pool = mysql.createPool({
    "user" : nodemon.env.MYSQL_USER,
    "password" : nodemon.env.MYSQL_PASSWORD,
    "database" : nodemon.env.MYSQL_DATABASE,
    "host" : nodemon.env.MYSQL_HOST,
    "port" : nodemon.env.MYSQL_PORT
});

exports.pool = pool;