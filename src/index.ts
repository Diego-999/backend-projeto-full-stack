import * as express from "express";
import * as dotenv from "dotenv";
import { AddressInfo } from "net";
import { signUp } from "./controller/Signup";
import { login } from "./controller/Login";
import { ImageController } from "./controller/ImageController";

const app = express();
const imageController = new ImageController();
app.use(express.json());
dotenv.config();

app.post("/signup", signUp);
app.post("/login", login);
app.post("/image", imageController.createImage);

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
