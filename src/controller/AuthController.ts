import { Request, Response } from "express";
import {prisma} from "../utils/prisma"
import { compare} from "bcryptjs";
import { sign } from "jsonwebtoken";


export class AuthController {

    async authenticate(req: Request, res: Response): Promise<void>  {
      const {email, password } = req.body;


      const user = await prisma.user.findUnique({where: {email}});

      if(!user){
        res.json({error: "User not found"}); 
        return;
      }

      const isValuePassword = await compare(password, user.password);

      if(!isValuePassword){
        res.status(401).json({error:"Password incorrect"});
        return;
      };

      const token = sign({id: user.id}, "eb7f198d389ffad9d762a0f2f6cca87c", {expiresIn: "1d"});

      const {id} = user;

     
      res.json({user: {id, email}, token});
    };
}