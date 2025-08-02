import {Router} from 'express';
import { EntregadorController } from './controller/EntregadorController';
import { AuthController } from './controller/AuthController';
import { CredenciadoController } from './controller/CredenciadoController';
import { ClienteController } from './controller/ClienteController';
import { AuthMiddleware } from './middleware/auth';


const entregadorcontroller = new EntregadorController();
const authcontroller = new AuthController();
const clientecontroller = new ClienteController();
const credenciadoController = new CredenciadoController();

export const router = Router();


router.post('/login', authcontroller.authenticate);

router.post('/createcredenciado', credenciadoController.createCredenciado);
router.get('/credenciados', credenciadoController.getCredenciado);

router.post('/createcliente', clientecontroller.createCliente);
router.get('/clientes', clientecontroller.getCliente);

router.post('/createentregador', entregadorcontroller.createEntregador);
router.get('/entregadores', entregadorcontroller.getEntregador);





