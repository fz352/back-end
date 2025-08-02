import {prisma} from '../utils/prisma';
import { Request, Response } from 'express';
import { hash } from "bcryptjs";




export class ClienteController {

 async getCliente (req: Request, res: Response): Promise <void> {
      const clientes = await prisma.pessoa.findMany({
        where: { tipoPessoa: "CLIENTE" }
      });
      
      res.json(clientes);
      return
  }

 async createCliente(req: Request, res: Response): Promise<void> {
  const { cpfCnpj , nome , password, email, telefone} = req.body;

  try {

    if (!cpfCnpj || !nome || !password || !telefone || !email) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const existingCliente = await prisma.pessoa.findUnique({
      where: { cpfCnpj },
    });

    if (existingCliente) {
      res.status(400).json({ error: 'Cliente já existe' });
      return;
    }

      const existingEmail = await prisma.pessoa.findUnique({
        where: { email }
      });

      if (existingEmail) {
        res.status(400).json({ error: 'Email já cadastrado' });
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
        tipoPessoa: "CLIENTE",
      },
    });
    res.status(201).json(pessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pessoa', details: error });
  }
}



}


