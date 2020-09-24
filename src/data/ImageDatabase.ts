import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class ImageDatabase extends BaseDatabase {
  private static TABLE_NAME = "images";

  public async createImage(
    id: string,
    subtitle: string,
    author: string,
    date: Date,
    file: string,
    collection: string,
    author_id: string
  ): Promise<void> {
    try {
      await this.getConnection().raw(`
      INSERT INTO ${ImageDatabase.TABLE_NAME} VALUES (
        "${id}",
        "${subtitle}",
        "${author}",
        "${date}",
        "${file}",
        "${collection}",
        "${author_id}"
      )      
      `);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getImagesByProfile(author_id: string): Promise<any[]> {
    try {
      const result = await this.getConnection().raw(`
        SELECT * FROM ${ImageDatabase.TABLE_NAME} where author_id = "${author_id}"
      
    `);

      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getImageById(id: string): Promise<any> {
    try {
      const result = await this.getConnection().raw(`
        SELECT * FROM ${ImageDatabase.TABLE_NAME} where id = "${id}"
      `);

      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
