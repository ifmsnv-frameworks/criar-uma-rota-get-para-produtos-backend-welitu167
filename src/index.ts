import 'dotenv/config'
import mysql from 'mysql2/promise';
console.log(process.env.DBUSER);

import express, { Request, Response } from 'express';
const app = express();

app.get('/', async (req: Request, res: Response) => {
    if (!process.env.DBUSER) {//! significa que é a negação da variável
        res.status(500).send("Variável de ambiente DBUSER não está definida")
        return;
    }
    if (process.env.DBPASSWORD==undefined) {
        res.status(500).send("Variável de ambiente DBPASSWORD não está definida")
        return;
    }
    if (!process.env.DBHOST) {
        res.status(500).send("Variável de ambiente DBHOST não está definida")
        return;
    }
    if (!process.env.DBNAME) {
        res.status(500).send("Variável de ambiente DBNAME não está definida")
        return;
    }
    if (!process.env.DBPORT) {
        res.status(500).send("Variável de ambiente DBPORT não está definida")
        return;
    }
});

app.get('/produtos', async (req: Request, res: Response) => {

    try {
        const connection = await mysql.createConnection({
            host: process.env.DBHOST as string,
            user: process.env.DBUSER as string,
            password: process.env.DBPASSWORD as string,
            database: process.env.DBNAME as string,
            port: Number(process.env.DBPORT)
        });

        const [rows] = await connection.execute('SELECT * FROM produtos');
        await connection.end();

        res.status(200).json(rows);

        } catch (error: any) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({
            erro: 'Erro ao buscar produtos',
            detalhes: error.message
        });
    }
});


//Tarefa: Criar uma rota get para produtos que retorne a lista de produtos do banco de dados
//O produto deve ter id, nome preco, urlfoto, descricao
//Deve-se criar uma tabela no banco de dados AIVEN para armazenar os produtos
//A resposta deve ser um array de produtos em formato JSON
//Crie o código sql para criar a tabela de produtos
/* 
CREATE TABLE produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    urlfoto VARCHAR(255) NOT NULL,
    descricao TEXT
);
Faz pelo menos 3 inserções nessa tabela
*/ 




app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
