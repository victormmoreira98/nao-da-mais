//index.js


import bodyParser from 'body-parser';
import { config } from 'dotenv-safe';
config();
import jwt from 'jsonwebtoken';
import express from 'express';
import http from 'http';

const verificacao = express()

const app = express(); 
 

verificacao.use(bodyParser.json());

verificacao.get('/', (req, res, next) => {
    res.json({message: "Servidor base '/' funcionando"});
})

verificacao.get('/exemplo', verifyJWT, (req, res, next) => { 
    console.log("Retorno do exemplo 'mockado' ....");
    res.json([{id:1,nome:'camargo'}]);
}) 

//Autenticação
verificacao.post('/login', (req, res, next ) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if ((req.body.user === 'camargo') && (req.body.pwd === '123')) { //&& req.body.password === "123") { req.body.user === 'camargo'
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET,{
        expiresIn: 300 // expires in 5min
      })
      return res.json({ auth: true, token: token });
    }
    res.status(500).json({message: 'Login inválido!'});
})

verificacao.post('/logout', function(req, res) {
    res.json({ auth: false, token: null });
})

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'Não há token' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Erro com a Autenticação do Token'})
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    })
}

const server = http.createServer(app); 

export default verificacao
