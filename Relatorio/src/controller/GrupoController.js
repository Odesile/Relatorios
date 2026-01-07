import { GrupoDao } from "../database/DAO/GrupoDAO.js";
import { GrupoModel } from "../model/GrupoModel.js";

export class GrupoController
{

    /**
     * Listar TODOS os grupos do sistema
     * @param {*} req - Requisição enviada pelo cliente/usuário.
     * @param {*} res - Resposta devolvida ao cliente/usuário.
     * 
     */

    async listar (req, res)
    {
        const dao = new GrupoDao();

        try
        {
            const lista = await dao.buscartodos();

            res.status(200).json(lista);
        }

        catch(error)
        {
            console.log('Erro ao listar a tabela ' , error);
            res.status(500).json({mensagem: "Erro ao listar grupos.",
                                  detalhe: error.message});
        }
    }


    /**
     * 
     * Lista os grupos pelo critério EMPRESA.
     * 
     * @param {*} req - Requisição enviada pelo cliente/usuário.
     * @param {*} res - Resposta devolvida ao cliente/usuário.
     */
    async listarPorEmpresa(req, res)
    {
        const dao = new GrupoDao();

        try
        {
            const linha = await dao.buscarPorEmpresa(req);
            res.status(200).jason(lista);

        }
        catch(error)
        {
            console.log("Erro ao listar a tabela ", error);
            res.status(500).json({mensagem: "Erro ao listar por empresa.",
                                  detalhe: error.message});
        }
    }
}
