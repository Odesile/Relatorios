import {Router} from "express";

//Importação dos controllers
import { GrupoController } from "../controller/GrupoController.js";

const router = Router();


// instanciando os Controllers
const grupoController = new GrupoController();



//Rotas
router.get('/', (req, res) => 
{
    res.send('Olá mundo')   
});

//ROTAS DE GRUPO
router.get('/grupos', (req, res) => grupoController.listar(req, res));
router.get('/grupos/:empresa', (req, res) => grupoController.listarPorEmpresa(req, res))
router.post('/grupos', (req, res) => grupoController.criar(req, res))




export {router}; 