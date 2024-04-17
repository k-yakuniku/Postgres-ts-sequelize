import {
  Sequelize,
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  dialect: "postgres",
});
// const sequelize = new Sequelize(
//   `postgres://Username:Password@Host:Port/DatabaseName`
// );
class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "Users",
    sequelize,
  }
);
interface InputUser {
  name?: string;
  email?: string;
  password?: string;
}
new User();
async function getUser() {
  const instance = await User.findAll();
  return instance;
}
async function createUser(user: InputUser) {
  const instance = await User.create({ ...user });
  return instance;
}
async function deleteUser(user: InputUser) {
  const instance = await User.destroy({
    where: { email: user.email, password: user.password },
  });
  return instance;
}
async function updateUser(user: InputUser) {
  const instance = await User.update(
    { ...user },
    { where: { email: user.email } }
  );
  return instance;
}

export { User, getUser, createUser, deleteUser, updateUser };
