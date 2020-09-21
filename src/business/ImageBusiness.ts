import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { ImageDatabase } from "../data/ImageDatabase";
import { TagsDatabase } from "../data/TagsDatabase";
import { ImageTagsDatabase } from "../data/ImageTagsDatabase";

export class ImageBusiness {
  public async createImage(image: {
    subtitle: string;
    author: string;
    date: Date;
    file: string;
    tags: string[];
    collection: string;
    token: string;
  }) {
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(image.token);
    const authorId = authenticationData.id;

    const imageDatabase = new ImageDatabase();
    const tagsDatabase = new TagsDatabase();
    const imageTagsDatabase = new ImageTagsDatabase();

    if (
      !image.author ||
      !image.collection ||
      !image.date ||
      !image.file ||
      !image.tags ||
      !image.subtitle
    ) {
      throw new Error("Campo inválido");
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

    for (const tag of image.tags) {
      const tagId = idGenerator.generate();
      await tagsDatabase.createTag(tagId, tag);
      await imageTagsDatabase.createRelationImageTag(id, tagId);
    }
  }

  public async getImageByProfile(token: string) {
    if (!token) {
      throw new Error("Preencha Token");
    }
    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);

    const authorId = authenticationData.id;

    const imageDatabase = new ImageDatabase();

    return await imageDatabase.getImagesByProfile(authorId);
  }

  public async getImageById(id: string, token: string) {
    if (!id || !token) {
      throw new Error("Preencha id e token");
    }

    const authenticator = new Authenticator();
    authenticator.verify(token);

    const imageDatabase = new ImageDatabase();

    return await imageDatabase.getImageById(id);
  }
}
