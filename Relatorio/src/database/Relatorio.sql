CREATE DATABASE Capsula_01;

-- Para rodar o código, pressione CTRL + ENTER

USE Capsula_01;

CREATE TABLE empresa
(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome VARCHAR(80) NOT NULL,
	cidade VARCHAR(45) NOT NULL,
	estado VARCHAR(45) NOT NULL
);

CREATE TABLE usuarios
(

	-- Declarando as propriedades da tabela
	cpf CHAR(11) PRIMARY KEY,
	nome VARCHAR(80) NOT NULL,
	email VARCHAR(80) NOT NULL UNIQUE,
	senha VARCHAR(32) NOT NULL,
	telefone VARCHAR(11) NOT NULL,
	admin TINYINT NOT NULL,

	-- Foreign Key
	empresa INT,
	FOREIGN KEY(empresa) REFERENCES empresa (id)

);

CREATE TABLE classificacao
(
	id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL
);

CREATE TABLE grupo
(
	empresa INT,
    numero INT,
    nome VARCHAR(45) NOT NULL,
    -- Primary Keys
    PRIMARY KEY (empresa, numero),
    FOREIGN KEY (empresa) REFERENCES empresa (id)
    
);

CREATE TABLE atividade
(
	id INT AUTO_INCREMENT,
	classificacao INT,
    grupo_empresa INT,
    grupo_numero INT,
    mes VARCHAR(45) NOT NULL,
    ano INT NOT NULL,
    participou TINYINT NOT NULL,
    horas INT,
    qtdestudos INT,
    observacao VARCHAR(150),

	-- Primary keys
    PRIMARY KEY(id, classificacao, grupo_empresa, grupo_numero),
    FOREIGN KEY(classificacao) REFERENCES classificacao (id),
    FOREIGN KEY(grupo_empresa, grupo_numero) REFERENCES grupo (empresa, numero)
);