export class ClassificacaoModel 
{
    constructor(id, nome)
    {
        //O ID ele é auto incrementado, portanto, é gerado pelo banco
        this.setid(id);
        this.setnome(nome);
    }

    //Getter e Setters
    getNome ()
    {
        return this.nome;
    }

    setnome (nome)
    {
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
