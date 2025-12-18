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
    {
        try
        {
            const sql = 'INSERT INTO grupo (empresa, numero, nome) VALUES (?, ?, ?)'; //Placeholders
            const valores = [grupo.getempresa(), grupo.getnumero(). grupo.getnome()];

            const  [resultado] = await pool.execute(sql, valores);// INSERT INTO grupo (empresa, numero, nome) VALUES (enoresa, numero, nome)
        
            return resultado.affectedRows > 0; // True ou False
        }
        catch(error)
        {
            console.log("Erro ao criar o grupo: ", error);
            throw error;
        }
    }
}

