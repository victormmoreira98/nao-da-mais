
import { config } from 'dotenv-safe';
config();

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import verificacaoRoutes from '../token';
import routes from './routes';

const server = express()
server.use(cors())
server.use(bodyParser.urlencoded({extended: false}))


server.use('/api', routes)                                                                     //todos os enderecos das rotas teram o endereco " /api "


server.use('/api', verificacaoRoutes);

server.listen(process.env.PORT, () =>{
    console.log(`servidor rodando em: http://localhost:${process.env.PORT}`) 
})


