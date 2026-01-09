import { EmpresaModel } from "../model/EmpresaModel.js";
import { EmpresaDAO } from "../database/DAO/EmpresaDAO.js";

export class EmpresaController
{
    /**
     * Lista todas as empresas.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async listar(req, res)
    {
        const dao = new EmpresaDAO();
        try
        {
            const lista = await dao.buscarTodos();
            res.status(200).json(lista);
        }
        catch(error)
        {
            console.log("Erro ao listar todas as empresas: ", error)
            res.status(500).json({messagem: "Erro ao listar empresas.", detalhe: error.message});
        }
    }

    /**
     * Lista a empresa pelo ID
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async listarPorId(req, res)
    {
        const dao = new EmpresaDAO();
        try
        {
            const idEmpresa = req.params.idEmpresa;
            const lista = await dao.bucarPorId(idEmpresa);
            res.status(200).json(lista);
        }
        catch(error)
        {
            console.log("Erro ao listar a empresa: ", error);
            res.status(500).json({messagem: "Erro ao listar grupos por ID", 
                                  detalhe: error.message});
        }
    }

    /**
     * Criar uma nova Empresa
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async criar (req, res)
    {
        const dao = new EmpresaDAO();
        try
        {
            // Desestruturação: pegamos os dados que vieram no corpo da requisição (JSON)
            const {nome, cidade, estado} = req.body;

            // Criamos o Model. 
            // Atenção: Passamos null no ID porque o banco vai gerar isso pra gente (Auto Increment).
            // Se os dados estiverem errados (ex: nome vazio), o Model vai disparar um erro aqui
            const novaEmpresa = new EmpresaModel(null, nome, cidade, estado);
            await dao.criar(novaEmpresa);
            res.status(201).json({message: "Empresa criada com sucesso!", dados: novaEmpresa});
        }
        catch(error)
        {
            console.log(error)
            if(error.code == "ER_DUP_ENTRY")
            {
                res.status(409).json({messagem: "Já existe uma empresa cadastrada com essas informações"});
            }
            res.status(400).json({messagem: "Erro ao cadastrar empresa.", detalhe: error.message});
        }
    }

    /**
     * Atualiza uma empresa cadastrada.
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async atualizar(req, res)
    {
        const dao = new EmpresaDAO();
        try
        {
            const id = req.params.id;
            const {nome, cidade, estado} = req.body;
            const empresaAtualizada = new EmpresaModel(id, nome, cidade, estado);
            const sucesso = await dao.atualizar(empresaAtualizada);

            if(!sucesso)
            {
                return res.status(404).json({messagem: "Empresa não encontrada!"});
            }
            res.status(200).json({messagem: "Empresa atualizada com sucesso!", detalhe: empresaAtualizada})
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({message: "Erro ao atualizar uma epmresa",
                                  detalhe: error.message})
        }
    }

    async apagar (req, res)
    {
        const dao = new EmpresaDAO();
        try
        {
            const id = req.params.id;
            const sucesso = await dao.apagar(id);
            
            if(!sucesso)
            {
                return res.status(404).json({mensagem: "Empresa não encontrada!"});
            }
            res.status(200).json({messagem: "Empresa exclupida com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem: "Erro ao apagar empresa", detalhe: error.message})
        }
    }
}