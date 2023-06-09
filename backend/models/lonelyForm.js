import connection from "../config/db.js";
import Sequelize from "sequelize";
import Silver from "./silvers.js";

const LonelyForm = connection.define(
  "loneliness_form",
  {
    lon_form_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    q1: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    q2: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    q3: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    q4: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    q5: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    q6: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    q7: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    q8: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    q9: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    q10: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    sum: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    enviar: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    observations: {
      type: Sequelize.STRING(1000),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default LonelyForm;

//relaciones entre silver y loneliness_form
LonelyForm.belongsTo(Silver, {
  foreignKey: "silver_id",
  targetKey: "silver_id",
});

Silver.hasMany(LonelyForm, {
  foreignKey: "silver_id",
  sourceKey: "silver_id",
});
