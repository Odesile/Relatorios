import { pool } from "../db.js";
import { ClassificacaoModel } from "../../model/ClassificacaoModel.js";

export class ClassificacaoDAO
{
    /**
     * Cria uma classificacao dentro do banco de dados.
     * 
     * @param {ClassificacaoModel} classificacao 
     * @returns {Promise<boolean>}
     */

    async criar(classificacao)
    {
        try
        {
            const sql_criar = "INSERT INTO classificacao (nome) VALUES (?)";
            const valores = [nome];
            const [resultado] = await pool.execute(sql_criar, valores);

            classificacao.setid(resultado.insertId);

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao criar Classificação: ", error)
            throw error;
        }
    }

    
    /**
     * Atualiza uma Classificação
     * 
     * @param {ClassificacaoModel} classificacao 
     * @returns {Promise<boolean>}
     */
    async atualizar(classificacao)
    {
        try
        {
            const sql_atualizar = "UPDATE classificacao SET nome = ? WHERE id = ?";
            const valores = [classificacao.getnome(), classificacao.getid()];
            const [resultado] = await pool.execute(sql_atualizar, valores);

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error(error);
            throw error;
        }
    }

    /**
     * Apagar uma Classificação com id específicado.
     * 
     * @param {number} id 
     * @returns {Promise<boolean>}
     */
    async apagar(id)
    {
        try
        {
            const sql_apagar = "DELETE FROM classficacao WHERE id = ?"
            const [resultado] = await pool.execute(sql_apagar, [id]);

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao apagar Classificação: ", error)
            throw error;
        }
    }
    
    /**
     * Lista todas as Classificações.
     * 
     * @returns {Promise<ClassificacaoModel|null>}
     */
    async buscarTodos()
    {
        try
        {
            const sql_buscaTodos = "SELECT * FROM classificacao";
            const [linhas] = await pool.query(sql_buscaTodos);

            if (linhas.length() === 0) return null;

            const linha = linhas[0];

            return linhas.map(linha => ClassificacaoModel(
                linha.getid(),
                linhas.getnome()
            ));
        }
        catch(error)
        {
            console.error(error);
            throw error;
        }
    }

    /**
     * Lista as Classificações por um id especificado.
     * 
     * @param {number} id 
     * @returns {Promise<ClassificacaoModel|null>}
     */
    async buscarPorId(id)
    {
        try
        {
            const sql_bpId = "SELECT * FROM classificacao WHERE id = ?"
            const [linhas] = await pool.query(sql_bpId, [id]);

            if(linhas.length() === 0) return null;

            const linha = linhas[0];

            return new ClassificacaoModel(
                linha.getid(),
                linhas.getnome()
            )
        }
        catch(error)
        {
            console.error("Erro ao listar a Classificação deste id: ", error)
            throw error;
        }
    }
}