import { Request, Response } from "express";
import {prisma} from "../utils/prisma"
import { hash } from "bcryptjs";


export class EntregadorController {
    async getEntregador (req: Request, res: Response): Promise <void> {
      const entregadores = await prisma.pessoa.findMany({
        where: { tipoPessoa: "ENTREGADOR" }
      });
      
      res.json(entregadores);
      return
    }

  async createEntregador(req: Request, res: Response): Promise<void> {
  console.log(req.body);
  const { cpfCnpj , nome , password, telefone, email, habilitacao } = req.body;

  try {

    if (!cpfCnpj || !nome || !password || !telefone || !email ) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const existingEntregador = await prisma.pessoa.findUnique({
      where: { cpfCnpj },
    });

    if (existingEntregador) {
      res.status(400).json({ error: 'Entregador já existe' });
      return;
    }

    const hashed_password = await hash(password, 8)

    const pessoa = await prisma.pessoa.create({
      data: {
        cpfCnpj,
        nome,
        password: hashed_password,
        email,
        telefone,
        habilitacao,
        tipoPessoa:"ENTREGADOR",
      },
    });

    await prisma.user.create({ data: { idPessoa: pessoa.id } });
    res.status(201).json(pessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pessoa', details: error });
  }
  }
}
