export class AtividadeModel
{
    constructor (id, classificacao, grupoEmpresa, grupoNumero, mes, ano ,participou, horas, qtdestudos, observacao)
    {
        this.setid(id);
        this.setclassificacao(classificacao);
        this.setempresa(grupoEmpresa);
    }


    getid()
    {
        return this.id;
    }
    setid(id)
    {
        this.id = id ? id : null;
    }


    getclassificacao()
    {
        return this.classificacao;
    }
    setclassificacao(classificacao)
    {
        if(!classificacao || isNaN(classificacao))
        {
            throw new Error("O ID da classificação é obrigatório.");
        }

        this.classificacao = classificacao;
    }

    getempresa()
    {
        return this.empresa;
    }
    setempresa(empresa)
    {
        if(!empresa || isNaN(empresa))
        {
            throw new Error("O ID da Empresa é obrigatório.");
        }

        this.empresa = empresa;
    }
}