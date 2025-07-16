import { Request, Response } from "express";
import {prisma} from "../utils/prisma"
import { hash } from "bcryptjs";


export class UserController {
    async index (req: Request, res: Response) {
      const users = await prisma.user.findMany();
      return res.json(users);
    }

    async store(req: Request, res: Response): Promise<void> {
      const {email, password} = req.body;

      const userExists = await prisma.user.findUnique({where: {email: email}});

      if(userExists){
        res.json({error: "User Exists"});
        return;
      }


      const hashed_password = await hash(password, 8)
      const user = await prisma.user.create({
        data:{
            email,
            password: hashed_password
        },
      });

      res.json({user});
    };
}