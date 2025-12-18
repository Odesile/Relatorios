import {pool} from "../db";
import {GrupoModel} from '../../model/GrupoModel'

export class GrupoDao
{
    /**
     * Criar grupos no banco de dados
     * 
     * @param {GrupoModel} grupo objeto do tipo GrupoModel 
     */

    async criar(grupo)
    {   //Tenta fazer o insert da tabela grupo
        try
        {
            //constante que guardará o comando sql
            const sql = 'INSERT INTO grupo (empresa, numero, nome) VALUES (?, ?, ?)'; //Placeholders
            
            //Os valores dos placeholders do comando sql
            const valores = [grupo.getempresa(), grupo.getnumero(). grupo.getnome()];

            //Execulta o comando sql
            const  [resultado] = await pool.execute(sql, valores);// INSERT INTO grupo (empresa, numero, nome) VALUES (empresa, numero, nome)
        
            return resultado.affectedRows > 0; // True ou False
        }
        catch(error)
        {
            console.log("Erro ao criar o grupo: ", error);
            throw error;
        }
    }

    // =-=-=-=-=-=-=-= Tentativa da função SELECT =-==-=-=-=-=-=-=-=-=
    async select(grupo)
    {
        try
        {
            const sql_select = 'SEELECT * from ?';
            const valor_select = grupo;
            const [resultado_select] = await pool.execute(sql_select, valor_select);
            
            return resultado_select;
            // SELECT * FROM grupo
        }
        catch(error)
        {
            console.log("Erro ao mostrar a tabela grupo")
            throw error;
        }
    }
}

