import User from "../models/users.js";

const getAll = async (req, res) => {
  try {
    let users = await User.findAll({
      attributes: ["iduser", "email", "password", "name", "telephone"],
    });
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving users.",
    });
  }
};

export default {
  getAll,
};
