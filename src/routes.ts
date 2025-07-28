import {Router} from 'express';
import { EntregadorController } from './controller/EntregadorController';
import { AuthController } from './controller/AuthController';
import { EmpresaController } from './controller/EmpresaController';
import { ClienteController } from './controller/ClienteController';
import { AuthMiddleware } from './middleware/auth';


const entregadorcontroller = new EntregadorController();
const authcontroller = new AuthController();
const clientecontroller = new ClienteController();
const empresacontroller = new EmpresaController();

export const router = Router();


router.post('/login', authcontroller.authenticate);

router.post('/createempresa', empresacontroller.createEmpresa);
router.get('/empresas', empresacontroller.getEmpresa);

router.post('/createcliente', clientecontroller.createCliente);
router.get('/clientes', clientecontroller.getCliente);

router.post('/createentregador', entregadorcontroller.createEntregador);
router.get('/entregadores', entregadorcontroller.getEntregador);





