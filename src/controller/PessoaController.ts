import {prisma} from '../utils/prisma';
import { Request, Response } from 'express';




export class PessoaController {

 async createPessoa(req: Request, res: Response): Promise<void> {
  const { cpfCnpj, endereco, telefone } = req.body;
  const userId = req.userId; 

  try {
    if (!cpfCnpj) {
      res.status(404).json({ error: "Pessoa não encontrada." });
      return;
    }

    if (!userId || isNaN(Number(userId))) {
      res.status(400).json({ error: "userId inválido ou não informado." });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado." });
      return;
    }

    const pessoa = await prisma.pessoa.create({
      data: {
        cpfCnpj,
        endereco,
        telefone,
        userId: Number(userId),
      },
    });
    res.status(201).json(pessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pessoa', details: error });
  }
}

  async getPessoas(req: Request, res: Response) {
    try {
      const pessoas = await prisma.pessoa.findMany();
      res.status(200).json(pessoas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar pessoas' });
    }
  }


}


