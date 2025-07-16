// import {prisma} from '../utils/prisma';
// import { Request, Response } from 'express';




// export class EmpresaController {
  
//   async createEmpresa(req: Request, res: Response): Promise<void> {
//     const { name, endereco, cnpj ,telefone  } = req.body;
//     const userId = parseInt(req.userId); 

//     try {

//         if (!cnpj) {
//             res.status(400).json({ error: "CPF do motorista é obrigatório." });
//             return;
//         }

//         if (!cnpj) {
//             res.status(404).json({ error: "Motorista não encontrado." });
//             return;
//         }

//         const user = await prisma.user.findUnique({
//             where: { id: userId },
//         });

//         if (!user) {
//             res.status(404).json({ error: "Usuário não encontrado." });
//             return;
//         };

//     const empresas = await prisma.empresa.findUnique({
//         where: {cnpj },
//     });
//       const empresa = await prisma.empresa.create({
//         data: {
//           name,
//           endereco,
//           cnpj,
//           telefone,
//           userId,
          
//         }
//       });
//       res.status(201).json(cnpj);
//     } catch (error) {
//       res.status(500).json({ error: 'Erro ao criar condomínio' });
//     }
//   }

//   async getCondominios(req: Request, res: Response) {
//     try {
//       const empresas = await prisma.empresa.findMany();
//       res.status(200).json(empresas);
//     } catch (error) {
//       res.status(500).json({ error: 'Erro ao buscar condomínios' });
//     }
//   }


 
// }