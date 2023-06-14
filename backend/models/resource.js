import connection from "../config/db.js";
import Sequelize from "sequelize";
import LonelyForm from "./lonelyForm.js";

const Resources = connection.define(
  "resources",
  {
    resources_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    day_care_center: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    cofee_n_chat: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    walking_club: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    reading_club: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    movie_club: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    home_assistance: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    phone_assistance: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    garden_group: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    cooking_group: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    cycling_group: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
    board_games: {
      type: Sequelize.TINYINT,
      allowNull: true,
    },
  },
  { timestamps: false, freezeTableName: true }
);

export default Resources;

// relación entre loneliness_form y resources

Resources.hasOne(LonelyForm, {
  foreignKey: "lon_form_id",
  targetKey: "lon_form_id",
});

LonelyForm.hasOne(Resources, {
  foreignKey: "lon_form_id",
  targetKey: "lon_form_id",
});
