import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {
  public async signUp(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<string> {
    if (!name || !email || !password) {
      throw new Error(
        "Insira todas as informações necessárias para o cadastro"
      );
    }

    if (password.length < 6) {
      throw new Error("A senha deve conter no mínimo seis caracteres");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDataBase = new UserDatabase();

    await userDataBase.createUser(id, name, email, hashPassword, role);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id, role });

    return token;
  }
}
