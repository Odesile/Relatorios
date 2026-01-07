import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// import {router} from './routes.js';

dotenv.config();
const app = express();

//Permite que o navegador autorize requisições de outras portas
//Ex: http://localhost:3001
app.use(cors());

app.use(express.json());
//app.use(router());

const PORT = process.env.WEB_PORT || 3000;

app.get('/', (req, res) => {res.send('Olá mundo')});

app.listen(PORT, () =>
{
    console.log('\n O servidor rodando na portaa $(PORT)');
    console.log('\n O servidor rodando na http://localhost:$(PORT)');
    console.log('---------------------------------------------------------');
});

