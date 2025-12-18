export class EmpresaModel
{
    constructor(id, nome, cidade, estado){
        this.setid(id);
        this.setnome(nome);
        this.setcidade(cidade);
        this.setestado(estado);
    }

    //Getter e Setters
    getid()
    {
        return this.id;
    }
    setid(id)
    {
        this.id = id ? id : null;
    }


    getnome()
    {
        return this.nome;
    }
    setnome(nome)
    {
        if(!nome || nome.trim() === "" || nome.len() > 80)
        {
            throw new Error("Insira um nome váliodo")
        }
        this.nome = nome;
    }


    getcidade()
    {
        return this.cidade;
    }
    setcidade(cidade)
    {
        if(!cidade || cidade.trim() === ""|| cidade.len() > 45)
        {
            throw new Error("Insira um cidade váliodo")
        }
        this.cidade = cidade;
    }


    getestado()
    {
        return this.estado;
    }
    setestado(estado)
    {
        if(!estado || estado.trim() === "" || estado.len() > 45)
        {
            throw new Error("Insira um estado váliodo")
        }
        this.estado = estado;
    }
}