import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { ImageBusiness } from "../business/ImageBusiness";

export class ImageController {
  public async createImage(req: Request, res: Response) {
    try {
      const { subtitle, author, date, file, tags, collection } = req.body;
      const token = req.headers.authorization as string;

      const input = {
        subtitle,
        author,
        date,
        file,
        tags,
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

  public async getImageByProfile(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const imageBusiness = new ImageBusiness();

      const images = await imageBusiness.getImageByProfile(token);

      res.status(200).send(images);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }

  public async getImageById(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const id = req.params.id;

      const imageBusiness = new ImageBusiness();

      const image = await imageBusiness.getImageById(id, token);

      res.status(200).send(image);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    await BaseDatabase.destroyConnection();
  }
}
