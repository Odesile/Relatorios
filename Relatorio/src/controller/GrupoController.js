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
            const idEmpresa = req.params.idEmpresa;

            const lista = await dao.buscarPorEmpresa(idEmpresa);

            res.status(200).jason(lista);


        }
        catch(error)
        {
            console.log("Erro ao listar os grupos: ", error);
            res.status(500).json({mensagem: "Erro ao listar grupos por empresa.",
                                  detalhe: error.message});
        }
    }

    /**
     * Lista a empresa por chave composta
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async ListarComposta (req, res)
    {
        const dao = new GrupoDao();
        try
        {
            const idEmpresa = req.params.idEmpresa;
            const numero = req.params.numero;

            const grupo = await dao.buscarComposta(idEmpresa, numero);

            res.status(200).json(grupo);
        }
        catch(error)
        {
            console.log("Erro ao listar a tabela ", error);
            res.status(500).json({mensagem: "Erro ao listar grupos por chave composta.",
                                  detalhe: error.message})

        }
    }

    /**
     * Cria um novo grupo no sistema.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async criar(req, res)
    {
        const dao = new GrupoDao();
        try
        {
            const {empresa, numero, nome} = req.body;
            const novoGrupo = new GrupoModel(empresa, numero, nome);
            await dao.criar(novoGrupo)
            res.status(201).json({message: "Grupo criado com sucesso!", dados: novoGrupo});
        }
        catch(error)
        {
            console.log(error)
            if(error.code == "ED_DUP_ENTRY")
            {
                res.status(409).json({message: "Já existe um grupo com este número nesta empresa."});
            }
            if(error.code == "NO_REFERENCED_ROW")
            {
                res.status(409).json({message: "A empresa que você tentou referênciar não existe."});
            }

            res.status(500).json({message:"Erro ao criar o grupo.", detalhe: error.message});
        }
    }

    /**
     * Atualiza um grupo com o critério de busca ID.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async atualizar (req, res)
    {
        const dao = new GrupoDao();
        try
        {
            const id = req.params.id;
            const {empresa, numero, nome} = req.body;
            const grupoAtualizado = new GrupoModel(id, empresa, numero, nome);
            const sucesso = await dao.atualizar(grupoAtualizado);

            if(!sucesso)
            {
                res.status(404).json({messagem: "Erro ao encontrar o grupo!"})
            }
            res.status(200).json({messagem: "Grupo atualizado com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem : "Erro ao atualizar o grupo!", detalhe : error.message});
        }
    }

    /**
     * Exclui um grupo pelo critério ID.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async apagar (req, res)
    {
        const dao = GrupoDao();
        try
        {
            const id = req.params.id;
            const sucesso = await dao.apagar(id);

            if(!sucesso)
            {
                res.status(404).json({messagem: "Grupo não encontrado!"})
            }
            res.status(200).json({messagem:"Grupo excluído com sucesso!"})
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem:"Erro ao exluir o grupo.", detalhe: error.message});
        }
    }

}
