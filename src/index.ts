import * as express from "express";
import * as dotenv from "dotenv";
import { AddressInfo } from "net";
import { signUp } from "./controller/Signup";
import { login } from "./controller/Login";
import { ImageController } from "./controller/ImageController";
import * as cors from "cors";

const app = express();
const imageController = new ImageController();
app.use(express.json());
dotenv.config();
app.use(cors());

app.post("/signup", signUp);
app.post("/login", login);
app.post("/image", imageController.createImage);
app.get("/image", imageController.getImageByProfile);
app.get("/image/:id", imageController.getImageById);

const server = app.listen(4000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
