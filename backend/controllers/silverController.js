import Agent from "../models/agents.js";
import Silver from "../models/silvers.js";
import LonelyForm from "../models/lonelyForm.js";
import Resources from "../models/resources.js";

const getAll = async (req, res) => {
  try {
    const silver_id = req.params.id;
    let silver = await Silver.findAll(silver_id, {
      attributes: [
        "silver_id",
        "name",
        "surname",
        "telephone",
        "address",
        "email",
        "city",
        "postal_code",
        "dni_nie",
        "birthday",
        "gender",
        "marital_status",
        "social_security_number",
        "results",
        "new_valuation_date",
        "contact_person",
        "contact_p_relation",
        "contact_p_telephone",
      ],
      include: [
        {
          model: LonelyForm,
          attributes: [
            "lon_form_id",
            "date",
            "q1",
            "q2",
            "q3",
            "q4",
            "q5",
            "q6",
            "q7",
            "q8",
            "q9",
            "q10",
            "sum",
            "observations",
          ],
        },
      ],
    });
    res.send(silver);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving silvers.",
    });
  }
};

const getById = async (req, res) => {
  try {
    const silver_id = req.params.id;
    let silver = await Silver.findByPk(silver_id, {
      attributes: [
        "silver_id",
        "name",
        "surname",
        "telephone",
        "address",
        "email",
        "city",
        "postal_code",
        "dni_nie",
        "birthday",
        "gender",
        "marital_status",
        "social_security_number",
        "results",
        "new_valuation_date",
        "contact_person",
        "contact_p_relation",
        "contact_p_telephone",
      ],
      include: [
        {
          model: LonelyForm,
          attributes: [
            "lon_form_id",
            "date",
            "q1",
            "q2",
            "q3",
            "q4",
            "q5",
            "q6",
            "q7",
            "q8",
            "q9",
            "q10",
            "sum",
            "observations",
          ],
        },
        /*  {
          model: Resources,
          attributes: [
            `day_care_center`,
            `cofee_n_chat`,
            `walking_club`,
            `reading_club`,
            `home_assistance`,
            `phone_assistance`,
            `garden_group`,
            `cooking_group`,
            `cycling_group`,
            `board_games`,
            `movie_club`,
          ],
        }, */
      ],
    });
    res.send(silver);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving silvers.",
    });
  }
};

export default {
  getAll,
  getById,
};
