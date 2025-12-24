import { pool } from "../db";
import { UsuarioModel } from "../../model/UsuarioModel";

export class UsuarioDAO
{
    
    /**
     * 
     * @param {UsuarioModel} usuario
     * @returns {Promise<boolean>} 
     */
    async criar(usuario)
    {
        try
        {
            //Regra de Negócio: Extrai os 5 primeiros dígitos do CPF para ser a senha
            //O CPF no model já está limpo (sem pontos/traços)
            const senhaPadrao = usuario.getcpf().substring(0,5);
            
            usuario.setsenha(senhaPadrao);
            
            const sql_criar = "INSERT into usuarios (cpf, nome, email, senha, telefone, admin, empresa) VALUES (?, ?, ?, ?, ?, ?, ?)";

            const valores = [
                usuario.getcpf(),
                usuario.getnome(),
                usuario.getemail(),
                usuario.getsenha(),
                usuario.gettelefone(),
                usuario.getadmin(),
                usuario.getempresa()
            ]

            const [resultado] = await pool.execute(sql_criar, valores)

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error('Erro ao criar usuario: ', error)
            throw error;
        }
    }


    /**
     * Atualiza as informações de um usuario
     * 
     * @param {UsuarioModel} usuario
     * @returns {Promise<boolean>}
     */
    async atualizar(usuario)
    {
        try
        {
            const sql_atualizar = "UPDATE usuarios SET nome = ?, email = ?, senha = ?, telefone = ?, admin = ?, empresa = ?, WHERE cpf = ?";
            const valores = [
                usuario.getnome(),
                usuario.getemail(),
                usuario.getsenha(),
                usuario.gettelefone(),
                usuario.getadmin(),
                usuario.getempresa(),
                usuario.getcpf() // critério para o WHERE
            ];

            const [resultado] = await pool.execute(sql_atualizar, valores)

            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao atualizar usuário: ", error)
            throw error;
        }
    }

    /**
     * Deleta um usurário do banco com base no cpf
     * 
     * @param {string} cpf 
     * @returns {Promise<boolean>}
     */

    async apagar(cpf)
    {
        try
        {
            const sql_apagar = "DELETE FROM usuarios WHERE cpf = ?"
            const cpf_limpo = cpf.replace(/\D/g, '')
            const [resultado] = await pool.execute(sql_apagar, [cpf_limpo])
        
            return resultado.affectedRows > 0;
        }
        catch(error)
        {
            console.error("Erro ao deletar o usuario: ", error)
            throw error;

        }
    }

    /**
     * Busca todos os usuários
     * @returns {Promise<UsuarioModel[]>}
     */

    async buscarTodos()
    {
        try
        {
            const sql_bTodos = "SELECT * FROM usuarios ORDER BY nome ASC";
            const [linhas] = await pool.query(sql_bTodos);

            return linhas.map(linha => new UsuarioModel(
                linha.cpf,
                linha.nome,
                linha.email,
                linha.senha,
                linha.telefone,
                linha.admin,
                linha.empresa
            ));

        }
        catch(error)
        {
            console.error("Erro ao listar todos os usuários: ", error)
            throw error;
        }
    }


    /**
     * 
     * @param {string} cpf 
     * @returns {Promise<UsuarioModel|null>}
     */
    async buscarPorCpf(cpf)
    {
        try
        {
            const sql_bpCpf = "SELECT * FROM usuarios WHERE cpf = ?";
            const cpf_limpo = cpf.replace(/\D/g, '');

            const [linhas] = await pool.query(sql_bpCpf, [cpf_limpo])

            if (linhas.length() === 0) return null;

            const linha = linhas[0];
            return new UsuarioModel(
                linha.cpf,
                linha.nome,
                linha.email,
                linha.senha,
                linha.telefone,
                linha.admin,
                linha.empresa
            );
        }
        catch(error)
        {
            console.error("Erro ao buscar usuário por CPF: ", error)
            throw error;
        }
    }


    /**
     * Busca um usuario com base no email informado.
     * 
     * @param {string} email - email do usuario da qual gostaria de procurar
     * 
     * @returns {Promise<UsuarioModel|null>}
     */
    async buscarPorEmail(email)
    {
        try
        {
            const sql_bpEmail = "SELECT * FROM usuarios WHERE email = ?"
            const [linhas] = await pool.query(sql_bpEmail, [email]);

            if (linhas.length() === 0) return null;

            const linha = linha[0];

            return new UsuarioModel(
                linha.cpf,
                linha.nome,
                linha.email,
                linha.senha,
                linha.telefone,
                linha.admin,
                linha.empresa
            );
        }
        catch
        {

        }
    }
}