import {Router} from 'express';
import { CondominioController } from './controller/CondominioController';
import { BlocoController } from './controller/BlocoController';
import { ApartamentoController } from './controller/ApartamentoController';


const condominiocontroller = new CondominioController();
const blococontroller = new BlocoController();
const apartamentocontroller = new ApartamentoController();

export const router = Router();

router.post('/createcondominio', condominiocontroller.createCondominio);
router.get('/condominios', condominiocontroller.getCondominios);

router.post('/createbloco', blococontroller.createBloco);
router.get('/blocos', blococontroller.listarBlocos);

router.post('/createapartamento', apartamentocontroller.createApartamento);
router.get('/apartamentos', apartamentocontroller.listarApartamentos);