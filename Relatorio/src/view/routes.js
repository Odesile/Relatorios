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
const classificacaoController = new ClassificacaoController()/



//Rotas
router.get('/', (req, res) => 
{
    res.send('Olá mundo')   
});

//ROTAS DE GRUPO
router.get('/grupos', (req, res) => grupoController.listar(req, res));
router.get('/grupos/empresa', (req, res) => grupoController.listarPorEmpresa(req, res));
router.post('/grupos/criar', (req, res) => grupoController.criar(req, res));
router.put('/grupos/atualizar', (req, res) => grupoController.atualizar(req, res));
router.delete('/grupos/delete/:id')

//ROTAS DA ATIVIDADE
router.get('/atividades', (req, res) => atividadeController.listar(req, res));
router.get('/atividades/listarporid', (req, res) => atividadeController.listarPorId(req, res));
router.post('/atividades/criar', (req, res) => atividadeController.criar(req, res));
router.put('/atividades/atualizar', (req, res) => atividadeController.atualizar(req, res))

//ROTAS DA EMPRESA
router.get('/empresas', (req, res) => empresaController.listar(req, res));
router.get('/empresas/empresa', (req, res) => empresaController.listarPorEmpresa(req, res));
router.get('/empresas/id', (req, res) => empresaController.listarPorId(req, res));
router.post('/empresas/criar', (req, res) => empresaController.criar(req, res));
router.put('/empresas/atualizar', (req,res) => empresaController.atualizar(req, res));

//ROTAS DO USUARIO
router.get('/usuarios', (req, res) => empresaController.listar(req, res));
router.get('/usuarios/cpf')




export {router}; 