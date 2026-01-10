import { ClassificacaoModel } from "../model/ClassificacaoModel.js";
import { ClassificacaoDAO } from "../database/DAO/ClassificacaoDAO.js";

export class ClassificacaoController
{
    async listar (req, res)
    {
        const dao = new ClassificacaoDAO();
        try
        {
            const lista = await dao.buscarTodos();
            res.status(200).json({message: "Classificação(ões) listada(s) com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({message: "Erro interno ao listar as classificações", detail: error.message});
        }
    }

    async listarPorId(req, res)
    {
        const dao = new ClassificacaoDAO();
        try
        {
            const id = req.params.id;
            const lista = await dao.buscarPorId(id);
            
            if(!lista)
            {
                res.status(404).json({message: "Classificação não encontrada!"});
            }
            res.status(200).json({message: "Classificação(ões) listada(s) com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({message: "Erro ao lista classificação pelo id", detalhe: error.message});
        }
    }


    async criar (req, res)
    {
        const dao = new ClassificacaoDAO();
        try
        {
            const {nome} = req.body;
            const novaClassificacao = new ClassificacaoModel(null, nome);
            const sucesso = await dao.criar(novaClassificacao);

            res.status(201).json({message: "Classificação criada com sucesso!", dados : novaClassificacao});
            
        }
        catch(error)
        {
            console.log(error);
            if(error.code == "ER_DUP_ENTRY")
            {
                res.status(409).json({message: "Essa classificação já existe!"});
            }
            res.status(400).json({message: "Erro ao criar a classificação"});
        }
    }

    async atualizar (req, res)
    {
        const dao = new ClassificacaoDAO();
        try
        {
            const id = req.params.id;
            const {nome} = req.body;
            const novaClassificacao = new ClassificacaoModel(id, nome);
            const sucesso = await dao.atualizar(novaClassificacao);

            if(!sucesso)
            {
                res.status(404).json({message:"Classificação não encontrada!"});
            }
            res.status(200).json({message: "Classificação atualizada com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(400).json({message:"Erro ao atualizar classificação"});
        }
    }

    async apagar (req, res)
    {
        const dao = new ClassificacaoDAO();
        try
        {
            const id = req.params.id;
            const sucesso = await dao.apagar(id);

            if(!sucesso)
            {
                res.status(404).json({message: "Classificação não encontrada!"});
            }
            res.status(200).json({message:"Classificação excluída com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(400).json({message: "Erro ao tentar excluir a classificação!", detalhe: error.message});
        }
    }
}