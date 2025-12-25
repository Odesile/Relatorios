export class ClassificacaoModel 
{
    constructor(id, nome)
    {
        //O ID ele é auto incrementado, portanto, é gerado pelo banco
        this.setid(id);
        this.setnome(nome);
    }

    //Getter e Setters
    getnome ()
    {
        return this.nome;
    }

    setnome (nome)
    {
        if(!nome || nome.trim() === ""|| nome.len() > 45)
        {
            throw new Error("Insira um nome váliodo")
        }
        this.nome = nome;
    }

    getid ()
    {
        return this.id;
    }
    setid(id){
        this.id = id ? id : null;
    }

};
