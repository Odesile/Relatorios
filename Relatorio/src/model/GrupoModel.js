export class GrupoModel
{
    constructor(empresa, numero, nome)
    {
        this.setempresa(empresa);
        this.setnumero(numero);
        this.setnome(nome);

    }


    //Getters e Setters
    getempresa()
    {
        return this.empresa;
    }
    setempresa(empresa)
    {
        if(!empresa || empresa === "" || isNaN(empresa))
        {
            throw new Error("Insira uma quantidade de empresa válida")
        }
        this.empresa = empresa;
    }

    getnumero()
    {
        return this.numero;
    }
    setnumero(numero)
    {
        if(!numero || numero < 0 || isNaN(numero))
        {
            throw new Error("Digite um número válido!!");
        }
        this.numero = numero;
    }

    getnome()
    {
        return this.nome;
    }
    setnome(nome)
    {
        if(!nome || nome === "" || nome.len() > 45)
        {
            throw new Error("Insira um nome válido!")
        }
        this.nome = nome;
    }
}