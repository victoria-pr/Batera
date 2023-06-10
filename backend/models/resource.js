import connection from "../config/db.js";
import Sequelize from "sequelize";
import Silver from "./silvers.js";

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

// relación entre silvers y resources

Resources.belongsTo(Silver, {
  foreignKey: "silver_id",
  targetKey: "silver_id",
});

Silver.hasMany(Resources, {
  foreignKey: "silver_id",
  sourceKey: "silver_id",
});
