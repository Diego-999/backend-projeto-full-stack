import * as express from "express";
import { AddressInfo } from "net";
import { signUp } from "./controller/signup";
import { login } from "./controller/login";
import * as dotenv from "dotenv";

const app = express();
app.use(express.json());
dotenv.config();

app.post("/signup", signUp);
app.post("/login", login);

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
