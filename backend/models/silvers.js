import connection from "../config/db.js";
import Sequelize from "sequelize";
import Agent from "./agents.js";

const Silver = connection.define(
  "silver",
  {
    silver_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    surname: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    telephone: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING(45),
    },
    postal_code: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    dni_nie: {
      type: Sequelize.STRING(45),
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    gender: {
      type: Sequelize.STRING(15),
      allowNull: true,
    },
    marital_status: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    social_security_number: {
      type: Sequelize.STRING(45),
      allowNull: true,
    },
    results: {
      type: Sequelize.STRING(200),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default Silver;

// //relaciones entre silver y agent
Silver.belongsTo(Agent, {
  foreignKey: "agent_id",
  targetKey: "agent_id",
});
Agent.hasMany(Silver, {
  foreignKey: "agent_id",
  sourceKey: "agent_id",
});
