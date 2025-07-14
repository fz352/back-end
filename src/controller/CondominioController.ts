import {prisma} from '../utils/prisma';
import { Request, Response } from 'express';

export class CondominioController {
  
  async createCondominio(req: Request, res: Response) {
    const { nome, endereco, telefone, email  } = req.body;
    try {
      const condominio = await prisma.condominio.create({
        data: {
          nome,
          endereco,
          telefone,
          email
        }
      });
      res.status(201).json(condominio);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar condomínio' });
    }
  }

  async getCondominios(req: Request, res: Response) {
    try {
      const condominios = await prisma.condominio.findMany();
      res.status(200).json(condominios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar condomínios' });
    }
  }


 
}