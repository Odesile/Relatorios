export class AtividadeModel
{
    constructor (id, classificacao, grupoEmpresa, grupoNumero, mes, ano ,participou, horas, qtdestudos, observacao)
    {
        this.setid(id);
        this.setclassificacao(classificacao);
        this.setempresa(grupoEmpresa);
        this.setgruponumero(grupoNumero);
        this.setempresa(mes);
        this.setano(ano);
        this.setparticipou(participou);
        this.sethoras(horas);
        this.setqtdestudos(qtdestudos);
        this.setobservacao(observacao);
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

    getgruponumero()
    {
        return this.gruponumero;
    }
    setgruponumero(gruponumero)
    {
        if(!gruponumero || isNaN(gruponumero))
        {
            throw new Error("O número de grupos é obrigatório!")
        }
        this.gruponumero = gruponumero;
    }

    getmes()
    {
        return this.mes;
    }
    setmes(mes)
    {
        if(!mes || mes === "" || isNaN(mes) || mes > 12)
        {
            throw new Error("Insira um mês válido");
        }
        this.mes = mes;
    }

    getmes()
    {
        return this.mes;
    }
    setano(ano)
    {
        if(!ano || ano === "" || isNaN(ano))
        {
            throw new Error("Insira um ano válido");
        }
        this.ano = ano;
    }

    getparticipou()
    {
        return this.participou
    }
    setparticipou(participou)
    {
        this.participou = (participou === true || participou === "1" || participou === 1);
    }

    gethoras()
    {
        return this.horas;
    }
    sethoras(horas)
    {
        if(!horas || horas > 24 || isNaN(horas))
        {
            throw new Error("Insira uma hora válida");
        }
        this.horas = horas;
    }

    getqtdestudos()
    {
        return this.qtdestudos;
    }
    setqtdestudos(qtdestudos)
    {
        if(!qtdestudos || qtdestudos < 0 || isNaN(qtdestudos))
        {
            throw new Error("Insira um nome válido!");
        }
        this.qtdestudos = qtdestudos;
    }

    getobservacao()
    {
        return this.observacao;
    }
    setobservacao(observacao)
    {
        if(!observacao || observacao === "")
        {
            throw new Error("Digite uma observacao válida");
        }
        this.observacao = observacao;
    }

}