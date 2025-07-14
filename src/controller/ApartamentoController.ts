import {prisma} from '../utils/prisma';
import { Request, Response } from 'express';
import { hash } from 'bcryptjs';

export class ApartamentoController{
    async createApartamento(req: Request, res: Response): Promise<void> {
        const {nomeDono, numeroApartamento,numeroDono, blocoId} = req.body;
        try {
            if (!numeroApartamento || !numeroDono || !blocoId ) {
                res.status(400).json({ error: 'Número do apartamento, número do dono e ID do bloco são obrigatórios' });
                return;
            }

            const hashedNumber = await hash(numeroDono, 8);

            const apartamento = await prisma.apartamento.create({
                data:{
                    nomeDono,
                    numeroApartamento,
                    numeroDono,
                    blocoId,
                    hashCode: hashedNumber
                }
            });
            res.status(201).json(apartamento);

        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar apartamento' });
            return;
        }
    }

    async listarApartamentos(req: Request, res: Response): Promise<void> {
        try {
            const apartamentos = await prisma.apartamento.findMany({
                include: {
                    bloco: {
                        select: {
                            nome: true
                        }
                    }
                }
            });
            res.status(200).json(apartamentos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar apartamentos' });
        }
    }

}