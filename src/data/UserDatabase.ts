import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "Users_Full";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection().raw(`
        INSERT INTO ${UserDatabase.TABLE_NAME} VALUES (
          "${id}",
          "${email}",
          "${name}",
          "${password}",
          "${role}"
        )
      `);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByEmail(email: string): Promise<any> {
    try {
      const result = await this.getConnection().raw(`
        SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE email = "${email}"
      `);

      return result[0][0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserById(id: string): Promise<any> {
    try {
      const result = await this.getConnection().raw(`
      SELECT * FROM ${UserDatabase.TABLE_NAME} WHERE id = "${id}"
    `);

      return result[0][0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
