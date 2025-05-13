const express = require('express'); // biblioteca principal
const router = express.Router(); // gerenciador de rotas
const url = require('url'); // ter acesso a url
const queryString = require('querystring'); // filtrar a minha url
const mysql = require('./mysql').pool;

//http://localhost:3000/api.agenda/contato-dao/create
/*
{
    "nome" : "Jose",
    "fone" : "(99)99999-9999",
    "email" : "jose@gmail.com"
}
*/
router.post('/create',(req,res,next) => {
    const { nome , fone , email } = req.body
    const contato = { nome , fone , email }
    /*
    res.status(201).send({
        response : 'Contato cadastrado',
        'Dados do contato' : contato
    });
    */
    mysql.getConnection((error,conn) => {
        if(error){
            return res.status(401).send({
                // 401 : não autorizado
                error: error,
                response : null
            });
        }
        conn.query(
            'INSERT INTO contato ( nome, fone , email) VALUES (?,?,?)',
            [contato.nome,contato.fone,contato.email],
            (error, resultado, field) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        // 500 : server error
                        error: error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Contato cadastrado com sucesso!',
                    id_contato : resultado.insertedId
                });
            }
        )
    });
});

// http://localhost:3000/api.agenda/contato-dao/getAll
router.get('/getAll',(req,res,next) => {
    /*
    res.status(200).send({
        response : 'Contatos encontrados'
    });
    */
   mysql.getConnection((error,conn) => {
       if(error){
            return res.status(401).send({
                // 401 : não autorizado
                error: error,
                response : null
            });
        }
        conn.query(
            'SELECT * FROM contato;',
            (error,resultado,fields) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        // 500 : server error
                        error: error,
                        response : null
                    });
                }
                return res.status(200).send({
                    response : resultado
                });
            }
        ); 
   });
});

// http://localhost:3000/api.agenda/contato-dao/getId?id=1
router.get('/getId',(req,res,next) => {
    const reqUrl = url.parse(req.url);
    const queryParams = queryString.parse(reqUrl.query);
    const param = queryParams.id;
    /*
    res.status(200).send({
        response : 'Contato encontrado: >> ' + param
    });
    */
    mysql.getConnection((error,conn) =>{
        if(error){
            return res.status(401).send({
                // 401 : não autorizado
                error: error,
                response : null
            });
        }
        conn.query(
            'SELECT * FROM contato WHERE id = ?;',
            [param],
            (error, resultado, fields) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        // 500 : server error
                        error: error,
                        response : null
                    });
                }
                return res.status(200).send({
                    response : resultado
                });
            }
        );
    });
});

//http://localhost:3000/api.agenda/contato-dao/update
/*
{
    "id_contato" : 1,
    "nome" : "Jose",
    "fone" : "(99)99999-9999",
    "email" : "jose@gmail.com"
}
*/
router.post('/updateId',(req,res,next) => {
    const { id_contato , nome , fone , email } = req.body
    const contato = { id_contato , nome , fone , email }
    /*
    res.status(201).send({
        response : 'Contato atualizado',
        'Dados do contato' : contato
    });
    */
    mysql.getConnection((error,conn) => {
        if(error){
            return res.status(401).send({
                // 401 : não autorizado
                error: error,
                response : null
            });
        }
        conn.query(
            'UPDATE contato SET nome = ? , fone = ? , email = ? WHERE id = ? ;',
            [contato.nome,contato.fone,contato.email,contato.id_contato],
            (error,resultado, field) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        // 500 : server error
                        error: error,
                        response : null
                    });
                }
                res.status(200).send({
                    response : 'Contato atualizado com sucesso!',
                    'Dados do contato:' : contato
                });
            }
        )
    });
});

//http://localhost:3000/api.agenda/contato-dao/delete
/*
{
    "id_contato" : 1
}
*/
router.post('/deleteId',(req,res,next) => {
    const { id_contato } = req.body
    const contato = { id_contato }
    /*
    res.status(201).send({
        response : 'Contato excluído',
        'Dados do contato' : contato
    });
    */
    mysql.getConnection((error,conn) => {
        if(error){
            return res.status(401).send({
                // 401 : não autorizado
                error: error,
                response : null
            });
        }
        conn.query(
            'DELETE FROM contato WHERE id = ? ;',
            [contato.id_contato],
            (error, resultado, field) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        // 500 : server error
                        error: error,
                        response : null
                    });
                }
                res.status(201).send({
                    response : 'Contado excluído com sucesso!'
                });
            }
        );
    });
});

module.exports = router; // exportar as minhas rotas