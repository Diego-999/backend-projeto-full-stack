import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { ImageDatabase } from "../data/ImageDatabase";

export class ImageBusiness {
  public async createImage(image: {
    subtitle: string;
    author: string;
    date: Date;
    file: string;
    collection: string;
    token: string;
  }) {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(image.token);
    const authorId = authenticationData.id;

    const imageDatabase = new ImageDatabase();

    if (
      !image.author ||
      !image.collection ||
      !image.date ||
      !image.file ||
      !image.subtitle
    ) {
      throw new Error("Invalid field");
    }

    await imageDatabase.createImage(
      id,
      image.subtitle,
      image.author,
      image.date,
      image.file,
      image.collection,
      authorId
    );
  }
}
