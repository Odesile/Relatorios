import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, '.env')});
dotenv.config();

const pool = mysql.createPool(
{
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    connectionLimit: 5
})

pool.getConnection().then(connection => 
{
    console.log("Conectado ao banco de dados com sucesso")
    connection.release();
}).catch(err =>
{
    console.error('Erro ao criar conexão com o banco: ', err.message)
})

export{pool};
