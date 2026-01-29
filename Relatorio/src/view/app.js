import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {router} from './routes.js';

//Configuração para __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Configuração das variáveis de ambiente
dotenv.config();
const app = express();

//Configuração da View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); //Necessário para ler dados do formulário

//Midleware Customizado para Method Override
//Perime usar ?method=PUT ou ?method=DELETE na url de action dos formulários
app.use((req, res, next) => {
    if (req.query && req.query.method){
        req.method = req.query.method.toUpperCase();
    }
    next();
});

// Arquivos Estáticos <- pesquisar


//Rotas
app.use(router);
const PORT = process.env.WEB_PORT || 3000;


app.listen(PORT, () =>
{
    console.log(`\n O servidor rodando na portaa ${PORT}`);
    console.log(`\n O servidor rodando na http://localhost:${PORT}`);
    console.log('---------------------------------------------------------');
});

