export class UsuarioModel
{
    constructor(cpf, nome , email, senha, telefone, admin, empresa)
    {
        this.setcpf(cpf);
        this.setnome(nome);
        this.setemail(email);
        this.setsenha(senha);
        this.settelefone(telefone);
        this.setadmin(admin);
        this.setempresa(empresa);

    }

    //Getters e Setter

    getcpf()
    {
        return this.cpf;
    }
    setcpf(cpf) // Tratar o cpf retirando hífens e pontos
    {
        if(!cpf || cpf.trim() == "")
        {
            throw new Error("O CPF É OBRIGATORIO");
        }

        //Retira os hífens e pontos do cpf
        //10528926551 <=  105.289.265-51
        const CPFLIMPO = cpf.replace(/\D/g, '');

        if(CPFLIMPO.length > 11)
        {
            throw new Error("CPF INVALIDO, MAIS DE 11 CATACTERES");
        }
        this.cpf = CPFLIMPO;
    }


    getnome()
    {
        return this.nome;
    }
    setnome(nome)
    {
        if(!nome || nome.trim() == "");
            {
                throw new Error("Nome do usuário é obrigatório");
            }
        if(nome.len() > 45)
            {
                throw new Error("Nome do usuário inválido, maior que 45 caracteres");
            }
            this.nome = nome;
    }

    getemail()
    {
        return this.email;
    }
    setemail(email)
    {
        if(!email || email.trim() == "")
        {
            throw new Error("O campo Email é obrigatório");
        }
        if(!email.includes("@") || !email.includes("."));
        {
            throw new Error("O email é inválido");
        }
        if(email.length > 80)
        {
            throw new Error("O email utrapassa o limite de caracteres: (80)");
        }
        this.email = email;
    }

    getsenha()
    {
        return this.senha;
    }
    setsenha(senha)
    {
        if(!senha || senha.trim() == "")
        {
            throw new Error("O campo Email é obrigatório");
        }
        if(senha.length > 32)
        {
            throw new Error("A senha do usuário não pode ultrapasssar 32 caracteres")
        }
        this.senha = senha;
    }

    gettelefone()
    {
        return this.telefone;
    }
    settelefone(telefone)
    {
        if(!telefone || telefone.trim() === "")
        {
            throw new Error("O Telefone É OBRIGATORIO");
        }

        //Retira os hífens e pontos do telefone
        const telefoneLimpo = telefone.replace(/\D/g, '');

        if(telefone.length > 11)
        {
            throw new Error("Telefone INVALIDO, MAIS DE 11 CATACTERES");
        }
        this.telefine = telefoneLimpo;
    }

    getadmin()
    {
        return this.admin;
    }
    setadmin(admin)
    {
        this.admin = (admin === true || admin === 1 || admin.trim() === "1") ? 1 : 0;
    }

    getempresa()
    {
        return this.empresa;
    }
    setempresa(empresa)
    {
        if(!empresa)
        {
            throw new Error("O usuário deve ser obrigatoriamente dependente de uma empresa.")
        }
        if(isNaN(empresa))
        {
            throw new Error("O usuário precisa ter empresas")
        }
        this.empresa = empresa;
    }
}