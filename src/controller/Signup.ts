import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, name, password, role } = req.body;

    const userBusiness = new UserBusiness();
    const token = await userBusiness.createUser(name, email, password, role);

    res.status(200).send({
      message: "Usuário criado com sucesso",
      token,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
  await BaseDatabase.destroyConnection();
};
