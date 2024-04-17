import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BeforeFind,
    BeforeCreate,
    BeforeUpdate,
    BeforeDestroy,
    HasMany,
    PrimaryKey,
    AutoIncrement,
} from 'sequelize-typescript';
//import Products from './products';

@Table({
    timestamps: true,
    modelName: "Users",
})
class Users extends Model {
    @Column({
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
    })
    declare name: string;

    @Column({
        type: DataType.STRING,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
    })
    declare password: string;

    @CreatedAt
    declare createdAt: Date;
    @UpdatedAt
    declare updatedAt: Date;
}
export default Users;