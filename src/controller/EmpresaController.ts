import {prisma} from '../utils/prisma';
import { Request, Response } from 'express';
import { hash } from "bcryptjs";




export class EmpresaController {

  async getEmpresa (req: Request, res: Response): Promise <void> {
      const empresas = await prisma.pessoa.findMany({
        where: { tipoPessoa: "EMPRESA" }
      });
      
      res.json(empresas);
      return
  }

 async createEmpresa(req: Request, res: Response): Promise<void> {
  const { cpfCnpj , nome , password, cep, numero, estado, cidade, bairro, complemento, telefone, tipoPessoa } = req.body;

  try {
    
    if (!cpfCnpj || !nome || !password || !cep || !numero || !estado || !cidade || !bairro || !complemento || !telefone) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    const existingPessoa = await prisma.pessoa.findUnique({
      where: { cpfCnpj },
    });

    if (existingPessoa) {
      res.status(400).json({ error: 'Pessoa já existe' });
      return;
    }

    const hashed_password = await hash(password, 8)

    const pessoa = await prisma.pessoa.create({
      data: {
        cpfCnpj,
        nome,
        password: hashed_password,
        cep,
        numero,
        estado,
        cidade,
        bairro,
        complemento,
        telefone,
        tipoPessoa: "EMPRESA",
      },
    });
    res.status(201).json(pessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pessoa', details: error });
  }
}



}


