import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  User,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./src/database2/Users";
dotenv.config();
// pgは、Node.jsでPostgreSQLに接続するためのlibrary
// Sequelizeは、pgを使用してPostgreSQLとの通信を行うので、
// sequelize, pg はセットで install

// sequelize-cli で migrate
// npx sequelize-cli db:create --env development
// npx sequelize-cli model:create --name Users --attributes name:string,email:string,password:string
// model(--name table, --attributes field)
// npx sequelize-cli db:migrate // update
const app = express();
const PORT = process.env.PORT || 5000;
const ORIGIN_URL = process.env.PUBLIC_ORIGIN_URL as string;
const AccessControlAllowHeaders = [
  "X-CSRF-Token",
  "X-Requested-With",
  "Accept",
  "Accept-Version",
  "Content-Length",
  "Content-MD5",
  "Content-Type",
  "Date",
  "X-Api-Version",
  "Authorization",
];
app.disable("x-powered-by");
app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors({
    origin: ORIGIN_URL,
    allowedHeaders: AccessControlAllowHeaders,
    exposedHeaders: AccessControlAllowHeaders,
  })
);

app.get("/", async (req, res) => {
  const users = await getUser();
  res.json(users);
});
app.post("/create", async (req, res) => {
  const users = await createUser(req.body);
  res.json(users);
});
app.delete("/delete", async (req, res) => {
  const users = await deleteUser(req.body);
  res.json(users);
});
app.patch("/update", async (req, res) => {
  const users = await updateUser(req.body);
  res.json(users);
});
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
