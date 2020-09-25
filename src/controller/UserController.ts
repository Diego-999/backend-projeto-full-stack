import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
  public async getUserProfile(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const userBusiness = new UserBusiness();
      const user = await userBusiness.getUserProfile(token);

      res.status(200).send({ id: user.id, name: user.name });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }
}
