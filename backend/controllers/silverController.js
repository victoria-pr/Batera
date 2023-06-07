import Agent from "../models/agents.js";
import Silver from "../models/silvers.js";
import LonelyForm from "../models/lonelyForm.js";

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

export default {
  getById,
};
