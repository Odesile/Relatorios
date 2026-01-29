import {Router} from "express";

//Importação dos controllers
import { GrupoController } from "../controller/GrupoController.js";
import { AtividadeController } from "../controller/AtividadeController.js";
import { EmpresaController } from "../controller/EmpresaController.js";    
import { UsuarioController } from "../controller/UsuarioController.js";
import { ClassificacaoController } from "../controller/ClassificacaoController.js";

const router = Router();


// instanciando os Controllers
const grupoController = new GrupoController();
const atividadeController = new AtividadeController();
const empresaController = new EmpresaController();
const usuarioController = new UsuarioController();
const classificacaoController = new ClassificacaoController();

 

//Rotas
router.get('/', (req, res) => 
{
    res.send('Olá mundo')   
});
//ROTAS DO LOGIN
router.get('/', (req, res) => res.redirect('/login'));
router.get('/login', (req, res) => usuarioController.formLogin(req, res));
router.post('login', (req, res) => usuarioController.login(req, res))

//ROTAS DE GRUPO
router.get('/grupos', (req, res) => grupoController.listar(req, res));
router.get('/grupos/:idEmpresa', (req, res) => grupoController.listarPorEmpresa(req, res));
router.post('/grupos/criar', (req, res) => grupoController.criar(req, res));
router.put('/grupos/atualizar/:id', (req, res) => grupoController.atualizar(req, res));
router.delete('/grupos/:idEmpresa/:numero', (req, res) => grupoController.apagar(req, res));

//ROTAS DA ATIVIDADE
router.get('/atividades', (req, res) => atividadeController.listar(req, res));
router.get('/atividades/:id', (req, res) => atividadeController.listarPorId(req, res));
router.post('/atividades/criar', (req, res) => atividadeController.criar(req, res));
router.put('/atividades/atualizar/:id', (req, res) => atividadeController.atualizar(req, res));
router.delete('/atividades/apagar/:id', (req, res) => atividadeController.apagar(req, res));

//ROTAS DA EMPRESA
router.get('/empresas', (req, res) => empresaController.listar(req, res));
router.get('/empresas/:idEmpresa', (req, res) => empresaController.listarPorEmpresa(req, res));
router.get('/empresas/:id', (req, res) => empresaController.listarPorId(req, res));
router.post('/empresas/criar', (req, res) => empresaController.criar(req, res));
router.put('/empresas/atualizar/:id', (req,res) => empresaController.atualizar(req, res));
router.delete('/empresas/apagar/:id', (req, res) => empresaController.apagar(req, res));

//ROTAS DO USUARIO
router.post('/usuarios/criar', (req, res) => empresaController.criar(req, res));
router.put('usuarios/atualizar/:id', (req, res) => empresaController.atualizar(req, res));
router.get('/usuarios', (req, res) => usuarioController.listar(req, res));
router.get('usuarios/listar/id/:id', (req, res) => usuarioController.listarPorId(req, res));
router.get('usuarios/listar/cpf/:cpf', (req, res) => usuarioController.listarPorCpf(req, res));
router.get('usuarios/listar/email/:email', (req, res) => usuarioController.listarPorEmail(req, res));
router.delete('usuarios/apagar/:id', (req, res) => usuarioController.apagar(req, res));

//ROTAS DA CLASSIFICAÇÃO
router.post('classificacao/criar', (req, res) => classificacaoController.criar(req, res));
router.put('classificacao/atualizar/:id', (req, res) => classificacaoController.atualizar(req, res));
router.get('classificacao', (req, res) => classificacaoController.listar(req, res));
router.get('classificacao/listar/id/:id', (req, res) => classificacaoController.listarPorId(req, res));
router.delete('classificacao/apagar/:id', (req, res) => classificacaoController.apagar(req, res));




export {router}; 