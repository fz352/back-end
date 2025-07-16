import {Router} from 'express';
import { UserController } from './controller/UserController';
import { AuthController } from './controller/AuthController';


const usercontroller = new UserController();
const authcontroller = new AuthController();

export const router = Router();

router.post('/createuser', usercontroller.store); 
router.post('/login', authcontroller.authenticate);

