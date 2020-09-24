import { BaseDatabase } from "./BaseDatabase";
import { ImageDatabase } from "./ImageDatabase";

export class TagsDatabase extends BaseDatabase {
  private static TABLE_NAME = "hashtags";

  public async createTag(id: string, name: string): Promise<void> {
    try {
      await this.getConnection().raw(`
        INSERT INTO ${TagsDatabase.TABLE_NAME} VALUES (
          "${id}",
          "${name}"
        )
      `);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
