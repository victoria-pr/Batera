// Desc: Model for users table
import connection from "../config/db.js";
import Sequelize from "sequelize";

const User = connection.define(
  "users",
  {
    iduser: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    telephone: {
      type: Sequelize.INTEGER,
      unique: true,
      unsigned: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default User;
//relaciones entre usuarios y user_info

/* User.hasMany(Orders, {
  foreignKey: "iduser",
  sourceKey: "iduser",
});
 */
