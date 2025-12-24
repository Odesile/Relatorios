import { pool } from "../db";
import { EmpresaModel } from "../../model/EmpresaModel";

export class EmpresaDAO
{

    /**
     * Cria uma empresa no banco
     * 
     * @param {EmpresaModel} empresa 
     * @returns {Promise<boolean>}
     */
    async criar (empresa)
    {
        try
        {
            const sql_criar = "INSERT INTO empresa (nome, cidade, estado) VALUES (?, ?, ?)";
            const valores = [empresa.getnome(), empresa.getcidade(), empresa.getestado()];
            const [resultado] = await pool.execute(sql_criar, valores);

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao criar uma empresa: ", error)
            throw error;
        }
    }

    /**
     * Atualliza uma empresa do banco
     * 
     * @param {EmpresaModel} empresa 
     * @returns {Promise<boolean>}
     */
    async atualizar (empresa)
    {
        try
        {
            const sql_atualizar = "UPDATE empresa SET nome = ?, cidade = ?, estado = ? WHERE id = ?";
            const valores = [
                empresa.getnome(),
                empresa.getcidade(),
                empresa.getestado(),
                empresa.getid()
            ]
            const [resultado] = await pool.execute(sql_atualizar, valores);

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao atualizar empresa: ", error)
            throw error;
        }
    }

    /**
     * Apaga uma empresa do banco de dados.
     * 
     * @param {number} id 
     * @returns {Promise<boolean>}
     */
    async apagar (id)
    {
        try
        {
            const sql_apagar = "DELETE FROM empresa WHERE id = ?";
            const [resultado] = await pool.execute(sql_apagar, [id]);

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao deletar empresa: ", error);
            throw error;
        }
    }

    async buscarTodos()
    {
        try
        {
            const sql_buscaTodos = "SELECT * FROM empresa"
            const [linhas] = await pool.query(sql_buscaTodos);

            const linha = linhas[0];

            return new EmpresaModel(
                linha.getid(),
                linha.getnome(),
                linha.getcidade(),
                linha.getestado()
            )
        }
        catch(error)
        {
            console.error("Erro ao listas as empresas: ", error)
            throw error;
        }
    }

    async bucarPorId(id)
    {
        try
        {
            const sql_bpId = "SELECT * FROM empresa WHERE id = ?"
            const [linhas] = await pool.query(sql_bpId, [id]);

            const linha = linhas[0];

            return new EmpresaModel(
                linha.getid(),
                linha.getnome(),
                linha.getcidade(),
                linha.getestado()
            )
        }
        catch
        {

        }
    }
}