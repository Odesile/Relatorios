import { AtividadeDAO } from "../database/DAO/AtividadeDAO.js";
import { AtividadeModel } from "../model/AtividadeModel.js";

export class AtividadeController
{

    /**
     * Lista todas as atividades
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async listar (req, res)
    {
        const dao = new AtividadeDAO();
        try
        {
            const lista = await dao.buscarTodos();
            res.status(200).json({messagem: "Atividade(s) listada(s) com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem: "Erro ao listaro s usuários", detalhe: error.message});
        }
    }

    /**
     * Lista as atividade por ID
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async listarPorId(req, res)
    {
        const dao = new AtividadeDAO();
        try
        {
            const id = req.params.id;
            const lista = await dao.buscarPorId(id);
            
            if(!lista)
                {
                    res.status(404).json({messagem: "Atividade com esse Id não foi encontrado"});
                }
            res.status(200).json({messagem: "Atividade(s) listada(s) com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem: "Erro ao listar as atividades por ID", detalhe: error.message});
        }
    }

    /**
     * Cria uma novas atividades
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async criar (req, res)
    {
        const dao = AtividadeDAO();
        try
        {
            const {classificacao, grupoEmpresa, grupoNumero, mes, ano ,participou, horas, qtdestudos, observacao} = req.body;
            const novaAtividade = new AtividadeModel(null, classificacao, grupoEmpresa, grupoNumero, mes, ano ,participou, horas, qtdestudos, observacao);
            await dao.criar(novaAtividade);
            res.status(201).json({messagem:"Atividade Criada com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            if(error.code == "ER_DUP_ENTRY")
            {
                res.status(409).json({messagem: "Já existe uma atividade com esse ID!", detalhe: error.message});
            }
            res.status(400).json({messagem: "Erro ao cadastrar atividade", detalhe: error.message});
        }
    }

    /**
     * Atualiza uma atividade
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async atualizar (req, res)
    {
        const dao = new AtividadeDAO();
        try
        {
            const id = req.params.id;
            const {classificacao, grupoEmpresa, grupoNumero, mes, ano ,participou, horas, qtdestudos, observacao} = req.body;
            const novaAtividade = new AtividadeModel(id, classificacao, grupoEmpresa, grupoNumero, mes, ano ,participou, horas, qtdestudos, observacao);
    
            const sucesso = await dao.atualizar(novaAtividade);

            if(!sucesso)
            {
                res.status(404).json({messagem: "Atividade com este ID não encontrada"});
            }
            res.status(200).json({messagem: "Atividade atualizada com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem:"Erro ao atualizar a atividade", detalhe: error.mesage});
        }
    }

    /**
     * Apagar uma atividade
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async apagar (req, res)
    {
        const dao = new AtividadeDAO();
        try
        {
            const id = req.params.id;
            const sucesso = await dao.apagar(id);

            if(!sucesso)
            {
                res.status(404).json({message: "Atividade não encontrada"});
            }
            res.status(200).json({message: "Atividade excluída com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem: "Erro ao apagar a atividade", detalhe: error.message});
        }
    }
}