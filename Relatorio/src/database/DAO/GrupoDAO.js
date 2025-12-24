import {pool} from "../db";
import {GrupoModel} from '../../model/GrupoModel'

export class GrupoDao
{
    /**
     * Criar grupos no banco de dados
     * 
     * @param {GrupoModel} grupo objeto do tipo GrupoModel
     * @returns {Promise<boolean}
     */

    async criar(grupo)
    {   //Tenta fazer o insert da tabela grupo
        try
        {
            //Executará os comandos SQLs
            const sql = 'INSERT INTO grupo (empresa, numero, nome) VALUES (?, ?, ?)'; //Placeholders
            const valores = [grupo.getempresa(), grupo.getnumero(). grupo.getnome()];
            const  [resultado] = await pool.execute(sql, valores);// INSERT INTO grupo (empresa, numero, nome) VALUES (empresa, numero, nome)
        
            //Retorna um booleano se a quantidade de linhas afetadas foram maior que 0 ou não
            return resultado.affectedRows > 0; // True ou False
        }
        catch(error)
        {
            console.log("Erro ao criar o grupo: ", error);
            throw error;
            
        }
    }

    /**
     * 
     * Atualiza o nome de um grupo.
     * a chave (empresa, numero) é usada no WHERE e não pode ser alterada aqui.
     * 
     * @param {GrupoModel} grupo
     * @returns {Promise<boolean>}
     */
     async atualizar(grupo)
    {
        try
        {
            const sql_atualizar = 'UPDATE grupo SET nome = ? WHERE empresa = ? AND numero = ?';

            //Primeiro o SET, depois o WHERE. É crucial a ordem
            const valores = [grupo.getnome(), grupo.getempresa(), grupo.getnumero()]
            const [result] = await pool.execute(sql_atualizar, valores);
            return result.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao atualiar grupo:", error)
            throw error;
        }
    }

    /**
     * Remove um grupo.
     * Exige as duas chaves para identificar o registro único. 
     * 
     * @param {number} idEmpresa 
     * @param {number} numeroGrupo
     * @returns {Promise<boolean>} 
     */
    
    async apagar(idEmpresa, numeroGrupo)
    {
        try
        {
            const sql_apagar = "DELETE FROM grupo WHERE empresa = ? AND numero = ?";
            const [result] = await pool.execute(sql, [idEmpresa, numeroGrupo]);

            return affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao deletar o grupo: ", error)
            throw error;
        }
    }


    /**
     * 
     * @param {GrupoModel} grupo
     * @returns {Promise<boolean>}
     */
    async buscartodos()
    {
        try
        {
            const sql_select = 'SEELECT * FROM grupo';
            const [linhas] = await pool.query(sql);

            return linhas.map(linha => new GrupoModel(
                linha.empresa,
                linha.numero,
                linha.nome
            ));
            
        }
        catch(error)
        {
            console.log("Erro ao listar todos os grupos")
            throw error;
        }
    }

    /**
     * Lista todos os grupos de uma Empresa específica.
     * 
     * @param {number} idEmpresa 
     * @returns {Promise<GrupoModel[]>}
     */

    async buscarPorEmpresa(idEmpresa)
    {
        try
        {
            const sql_bpEmpresa = "SELECT * FROM grupo WHERE empresa = ? ORDER BY numero ASC";
            const [linhas] = await pool.query(sql, [idEmpresa]);

            return linhas.map(linha => new GrupoModel(
                linha.empresa,
                linha.numero,
                linha.nome
            ));
        }
        catch(error)
        {
            console.error("Erro ao buscar grupos da empresa: ", error)
            throw error;
        }
    }

    /**
     * Bsuca um grupo específico pela chave composta.
     * 
     * @param {number} idEmpresa 
     * @param {number} numeroGrupo 
     * @returns {Promise<GrupoModel>|null}
     */

    async buscaComposta(idEmpresa, numeroGrupo)
    {
        try
        {
            const sql_bComposta = 'SELECT * grupo WHERE empresa = ? AND numero = ?';
            const [linhas] = await pool.query(sql_bComposta [idEmpresa, numeroGrupo])

            if (linhas.length === 0) return null;
            const linha = linhas[0]

            return new GrupoModel(linha.empresa, linha.numero, linha.nome);
        }
        catch(error)
        {
            console.error('Erro ao buscar grupo específico: ', error)
            throw error;

        }
    }
}

