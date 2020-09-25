import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {
  public async createUser(
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<string> {
    if (!name || !email || !password || !role) {
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

  public async getUserbyEmail(user: {
    email: string;
    password: string;
  }): Promise<any> {
    const userDataBase = new UserDatabase();
    const userFromDB = await userDataBase.getUserByEmail(user.email);

    const hashManager = new HashManager();
    const hashCompare = await hashManager.compare(
      user.password,
      userFromDB.password
    );

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({
      id: userFromDB.id,
      role: userFromDB.role,
    });

    const dataUser = {
      accessToken: accessToken,
      role: userFromDB.role,
    };

    if (!hashCompare) {
      throw new Error("Invalid Password");
    }
    return dataUser;
  }

  public async getUserProfile(token: string): Promise<any> {
    const authenticator = new Authenticator();
    const authenticationData = authenticator.verify(token);

    const userDataBase = new UserDatabase();
    const user = await userDataBase.getUserById(authenticationData.id);

    return user;
  }
}
