import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { ImageBusiness } from "../business/ImageBusiness";
import { stringify } from "querystring";

export class ImageController {
  public async createImage(req: Request, res: Response) {
    try {
      const { subtitle, author, date, file, collection } = req.body;
      const token = req.headers.authorization as string;

      const input = {
        subtitle,
        author,
        date,
        file,
        collection,
        token,
      };
      const imageBusiness = new ImageBusiness();

      await imageBusiness.createImage(input);

      res.send({ message: "Imagem criada com sucesso" }).status(200);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}
