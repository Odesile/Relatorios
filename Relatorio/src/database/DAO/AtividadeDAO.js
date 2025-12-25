import { pool } from "../db";
import { AtividadeModel } from "../../model/AtividadeModel";

export class AtividadeDAO
{

    /**
     * Registra uma atividade no banco de dados.
     * 
     * @param {AtividadeModel} atividade 
     * @returns {Promise<boolean>}
     */
    async criar(atividade)
    {
        try
        {
            const sql_criar = "INSERT INTO ativdade (atividade, grupo_empresa, grupo_numero, mes, ano, participou, horas, qtdestudos, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const valores = [
                atividade.getempresa(),
                atividade.getnumero(),
                atividade.getmes(),
                atividade.getano(),
                atividade.getparticipou(),
                atividade.gethoras(),
                atividade.getqtdestudos(),
                atividade.getobservacao()
            ];
            const [resultado] = await pool.execute(sql_criar, valores);

            atividade.setid(resultado.insertId);

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao criar atividade: ", error);
            throw error;
        }
    }

    /**
     * Atualiza uma Atividade registrada com base no ID.
     * 
     * @param {AtividadeModel} atividade 
     * @returns {Promise<boolean>}
     */
    async atualizar(atividade)
    {
        try
        {
            const sql_atualizar = "UPDATE atividade SET classificacao = ?, grupo_empresa = ?, grupo_numero = ?, mes = ?, ano = ?, participou = ?, horas = ?, qtdestudos = ?, observacao = ? WHERE id = ?";
            const valores = [
                atividade.getclassificacao(),
                atividade.getempresa(),
                atividade.getnumero(),
                atividade.getmes(),
                atividade.getano(),
                atividade.getparticipou(),
                atividade.gethoras(),
                atividade.getqtdestudos(),
                atividade.getobservacao(),
                atividade.getid()
            ];
            const [resultado] = await pool.execute(sql_atualizar, valores);

            return resultado.affectedRows > 0;
        }   
        catch(error)
        {
            console.error("Erro ao atualizar a Atividade: ", error)
            throw error;
        }
    }

    /**
     * Apaga uma atividade com base em seu ID.
     * 
     * @param {number} id 
     * @returns {Promise<boolean>}
     */
    async apagar(id)
    {
        try
        {
            const sql_apagar = "DELETE FROM atividade WHERE id = ?";
            const [resultado] = await pool.query(sql_apagar, [id]);

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao apagar Atividade com esse ID: ", error);
            throw error;
        }
    }

    /**
     * Lista todas as atividades.
     * 
     * @returns {Promise<AtividadeModel|null>}
     */
    async buscarTodos()
    {
        try
        {
            const sql_buscartodos = "SELECT * FROM atividade ORDER BY ano DESC, mes DESC";
            const [linhas] = await pool.query(sql_buscartodos);

            if (linhas.length() === 0) return null;

            return linhas.map(linhas => this.converterLinhaModel(linhas[0]));
        }
        catch(error)
        {
            console.error("Erro ao listar todas as Atividade: ", error);
            throw error;
        }

        
    }


    async buscarPorId(id)
    {
        try
        {
            const sql_bpId = "SELECT * FROM atividade WHERE id = ?"
            const [linhas] = await pool.query(sql_bpId, [id]);

            if (linhas.length() === 0) return null;

            return this.converterLinhaModel(linhas[0])

        }
        catch(error)
        {
            console.error("Erro ao encontrar Atividade com o ID especificado: ", error)
            throw error;
        }
    }

    //Metodo pra converter linhas de banco em uma instancia Atividade model
    converterLinhaModel(linha)
    {
    new AtividadeModel(
            linha.getid(),
            linha.getclassificacao(),
            linha.getempresa(),
            linha.getnumero(),
            linha.getmes(),
            linha.getano(),
            linha.getparticipou(),
            linha.gethoras(),
            linha.getqtdestudos(),
            linha.getobservacao()
        )
    }
}