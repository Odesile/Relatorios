import { UsuarioModel } from "../model/UsuarioModel.js";
import { UsuarioDAO } from "../database/DAO/UsuarioDAO.js";

export class UsuarioController
{
    async login (req, res)
    {
        const dao = new UsuarioDAO();
        try
        {
            const {email, senha} = req.body;

            //Validação básica de entrada.
            if(!email || !senha)
            {
                return res.status(400).json({messagem: "Email e Senha são obrigatórios."})
            }

            //Busca o usuário pelo Email
            const usuario = await dao.buscarPorEmail(email);

            //Verificação de Segurança
            //Se o usuário não existe OU a senha não bate, retornaremos erro 401 (unauthorized)
            //Atenção: Usamos uma mensagem generica para evitar enumeração de usuários (pesquise mais a fundo sobre isso).
            if(!usuario || usuario.getsenha() !== senha)
            {
                res.status(401).json({messagem: "Senha ou usuário incorreta!"});
            }

            //Sanitização (Remover dados sensíveis antes de enviar para o front-end)
            //Criamos um objeto simples apenas com o que o front-end precisa saber.
            const usuarioLogado ={
                cpf : usuario.getcpf(),
                nome : usuario.getnome(),
                email : usuario.getemail(),
                admin : usuario.getadmin(),
                empresaId: usuario.getempresa()
            };

            res.status(200).json({message: "Login realizado com sucesso!", usuario : usuarioLogado});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({message: "Erro interno no servidor ao realizar login ", detalhe: error.message});
        }
    }

    /**
     * Lista todos os usuários
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async listar (req, res)
    {
        const dao = new UsuarioDAO();
        try
        {
            const lista = await dao.buscarTodos();
            res.status(200).json({messagem: "Usuarios listados com sucesso!", detalhe: lista});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem: "Erro ao listar os usurários!", detalhe: error.message});
        }
    }

    /**
     * Lista os usuários por um CPF específico
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async listarPorCpf(req,res)
    {
        const dao = new UsuarioDAO();
        try
        {
            const cpf = req.params.cpf;
            const sucesso = await dao.buscarPorCpf(cpf);
            
            if(!sucesso)
            {
                res.status(404).json({messagem: "Usuario não encontrado!"});
            }
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem: "Erro ao listar o cpf", datelhe: error.message});
        }
    }

    /**
     * Lista os usuários por um EMAIL específico
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async listarPorEmail (req, res)
    {
        const dao = new UsuarioDAO();
        try
        {
            const email = req.params.email;
            const sucesso = await dao.buscarPorEmail(email);
            res.status(200).json({messagem: "Usuarios listador por email com sucesso"})
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem: "Erro ao listar usuario pelo email!", detalhe: error.message});
        }
    }

    /**
     * Cria um novo usuário
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async criar (req, res)
    {
        const dao = new UsuarioDAO();
        try
        {
            const {cpf, nome , email, senha, telefone, admin, empresa} = req.body;
            const novoUsuario = new UsuarioModel(cpf, nome , email, senha, telefone, admin, empresa);
            await dao.criar(novoUsuario);
            res.status(201).json({messagem: "Usuario criado com sucesso", dados: novoUsuario});
        }
        catch(error)
        {
            console.log(error);
            if(error.code == "ER_DUP_ENTRY")
            {
                res.status(409).json({messagem: "Já existe um usuário Cadastrado com esse CPF ou EMAIL."});
            }
            res.status(400).json({messagem: "Erro ao criar um usuário", detalhe: error.message});
        }
    }

    /**
     * Atualiza um usuário existente
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async atualizar (req, res)
    {
        const dao = new UsuarioDAO();
        try
        {
            const cpf = req.params.cpf;
            const {nome , email, senha, telefone, admin, empresa} = req.body;
            const novoUsuario = new UsuarioModel(cpf, nome, email, senha, telefone, admin, empresa);
            const sucesso = await dao.atualizar(novoUsuario);
            
            if(!sucesso)
            {
                res.status(404).json({messagem: "Erro ao encontrar usuario com esse cpf!"});
            }
            res.status(200).json({messagem: "Usuario atualizado com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messamge: "Erro ao atualizar usuário!", detalhe: error.message});
        }
    }

    /**
     * Apagar um usuário existente.
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async apagar (req, res)
    {
        const dao = new UsuarioDAO();
        try
        {
            const cpf = req.params.cpf;
            const sucesso = await dao.apagar(cpf);

            if(!sucesso)
            {
                res.status(404).json({messagem: "Usuario não encontrado!"});
            }
            res.status(200).json({messagem: "Usuario excluído com sucesso!"});
        }
        catch(error)
        {
            console.log(error);
            res.status(500).json({messagem: "Erro ao tentar excluir o usuário", detalhe: error.message});

        }
    }
}