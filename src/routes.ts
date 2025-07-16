import {Router} from 'express';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';
import { PessoaController } from './controller/PessoaController';
import { AuthMiddleware } from './middleware/auth';


const usercontroller = new UserController();
const authcontroller = new AuthController();
const pessoacontroller = new PessoaController();

export const router = Router();

router.post('/createuser', usercontroller.store); 
router.post('/login', authcontroller.authenticate);

router.post('/createpessoa', AuthMiddleware, pessoacontroller.createPessoa);
router.get('/pessoas', AuthMiddleware, pessoacontroller.getPessoas);


