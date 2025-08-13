import { Request, Response } from "express";
import {prisma} from "../utils/prisma"


export class ProdutoController {
    async getProduto(req: Request, res: Response): Promise<void> {
       const produtos = await prisma.produto.findMany();
       res.status(200).json(produtos);
    }


    async createProduto(req: Request, res: Response): Promise<void> {
      const { nome, preco, categoria, descricao, disponivel, imageUrl } = req.body;     
        try {

            if (!nome || !preco|| !categoria || !descricao || !disponivel || !imageUrl) {
            res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            return;
            }

            const produto = await prisma.produto.create({
            data: {
                nome,
                preco,
                categoria,
                descricao,
                disponivel,
                imageUrl
            }
            });
            res.status(201).json(produto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar produto', details: error });
        }        
    };
};