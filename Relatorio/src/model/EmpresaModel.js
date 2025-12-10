export class EmpresaModel
{
    constructor(nome, cidade, estado){
        this.setnome(nome);
        this.setcidade(cidade);
        this.setestado(estado);
    }

    //Getter e Setters
    getnome()
    {
        return this.nome;
    }
    setnome(nome)
    {
        this.nome = nome;
    }


    getcidade()
    {
        return this.cidade;
    }
    setcidade(cidade)
    {
        this.cidade = cidade;
    }


    getestado()
    {
        return this.estado;
    }
    setestado(estado)
    {
        this.estado = estado;
    }
}