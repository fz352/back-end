import {Router} from 'express';
import { EntregadorController } from './controller/EntregadorController';
import { AuthController } from './controller/AuthController';
import { CredenciadoController } from './controller/CredenciadoController';
import { ClienteController } from './controller/ClienteController';
import { ProdutoController } from './controller/ProdutoController';
import { EmailController } from './controller/EmailController';
import { AuthMiddleware } from './middleware/auth';


const entregadorcontroller = new EntregadorController();
const authcontroller = new AuthController();
const clientecontroller = new ClienteController();
const credenciadocontroller = new CredenciadoController();
const produtocontroller = new ProdutoController();
const emailcontroller = new EmailController();

export const router = Router();


router.post('/login', authcontroller.authenticate);

router.post('/createcredenciado', credenciadocontroller.createCredenciado);
router.get('/credenciados', credenciadocontroller.getCredenciado);

router.post('/createcliente', clientecontroller.createCliente);
router.get('/clientes', clientecontroller.getCliente);

router.post('/createentregador', entregadorcontroller.createEntregador);
router.get('/entregadores', entregadorcontroller.getEntregador);


router.post('/createproduto', produtocontroller.createProduto);
router.get('/produtos', produtocontroller.getProduto);

router.post('/sendemail', emailcontroller.sendEmail)







