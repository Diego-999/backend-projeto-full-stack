import { BaseDatabase } from "./BaseDatabase";

export class ImageTagsDatabase extends BaseDatabase {
  private static TABLE_NAME = "labeview_images_hashtags";

  public async createRelationImageTag(
    idImage: string,
    idHashtag: string
  ): Promise<void> {
    try {
      await this.getConnection().raw(`
        INSERT INTO ${ImageTagsDatabase.TABLE_NAME} VALUES (
          "${idImage}",
          "${idHashtag}"
        )
      `);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
