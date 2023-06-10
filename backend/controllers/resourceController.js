import Silver from "../models/silvers.js";
import Agent from "../models/agents.js";
import Resources from "../models/resource.js";

const getAll = async (req, res) => {
  try {
    let resources = await Resources.findAll({
      attributes: [
        "resources_id",
        "day_care_center",
        "cofee_n_chat",
        "walking_club",
        "reading_club",
        "movie_club",
        "home_assistance",
        "phone_assistance",
        "garden_group",
        "cooking_group",
        "cycling_group",
        "board_games",
      ],
    });
    res.send(resources);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error ocurred while retrieving resources.",
    });
  }
};

const getById = async (req, res) => {
  try {
    const resources_id = req.params.id;
    let resources = await Resources.findByPk(resources_id, {
      attributes: [
        "resources_id",
        "day_care_center",
        "cofee_n_chat",
        "walking_club",
        "reading_club",
        "movie_club",
        "home_assistance",
        "phone_assistance",
        "garden_group",
        "cooking_group",
        "cycling_group",
        "board_games",
      ],
    });
    res.send(resources);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error ocurred while retrieving resources.",
    });
  }
};

//crear un nuevo recurso
const create = async (req, res) => {
  try {
    const silver_id = req.params.id;
    const newResource = await Resources.create({
      silver_id: silver_id,
      day_care_center: req.body.day_care_center,
      cofee_n_chat: req.body.cofee_n_chat,
      walking_club: req.body.walking_club,
      reading_club: req.body.reading_club,
      movie_club: req.body.movie_club,
      home_assistance: req.body.home_assistance,
      phone_assistance: req.body.phone_assistance,
      garden_group: req.body.garden_group,
      cooking_group: req.body.cooking_group,
      cycling_group: req.body.cycling_group,
      board_games: req.body.board_games,
    });
    if (newResource) {
      res.status(201).send({
        message: "New resource created.",
      });
    } else {
      res.status(400).send({
        message: "Error while creating resource.",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while creating resource.",
    });
  }
};

export default {
  getAll,
  getById,
  create,
};
