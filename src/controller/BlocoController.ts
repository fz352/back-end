import {prisma} from '../utils/prisma';
import { Request, Response } from 'express';

export class BlocoController {

    async createBloco(req: Request, res: Response): Promise<void> {
        const {nome, numeroApartamentos, condominioId} = req.body;
        try {
              if(!condominioId){
                 res.status(400).json({ error: 'Condomínio ID é obrigatório' });
                 return;
              }

            const condominioExists = await prisma.condominio.findUnique({
                where: { id: condominioId }
            });

            if (!condominioExists) {
                res.status(404).json({ error: "Condominio não encontrado." });
                return;
            }

            if (!nome || !numeroApartamentos) {
                res.status(400).json({ error: 'Nome e número de apartamentos são obrigatórios' });
                return;
            }

            const bloco = await prisma.bloco.create({
                data: {
                    nome,
                    numeroApartamentos,
                    condominioId
                }
            });
            res.status(201).json(bloco);
        } catch (error) {
             res.status(500).json({ error: 'Erro ao criar bloco'});
        }
    }

    async listarBlocos(req: Request, res: Response): Promise<void> {
        try {
            const blocos = await prisma.bloco.findMany({
                include: {
                    condominio: {
                        select:{
                            nome: true
                        }
                    }
                }
            });
            res.status(200).json(blocos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar blocos' });
        }
    }

}