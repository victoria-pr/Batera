import Silver from "../models/silvers.js";
import LonelyForm from "../models/lonelyForm.js";

const getById = async (req, res) => {
  try {
    const lon_form_id = req.params.id;
    let lonelyForms = await LonelyForm.findByPk(lon_form_id, {
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
        "enviar",
        "observations",
      ],
      include: [
        {
          model: Silver,
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
              model: Agent,
              attributes: [
                "agent_id",
                "email",
                "password",
                "name",
                "surname",
                "telephone",
              ],
            },
          ],
        },
      ],
    });
    res.send(lonelyForms);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving forms.",
    });
  }
};

//crear un formulario -NO LO HE PROBADO-
const create = async (req, res) => {
  try {
    const {
      date,
      q1,
      q2,
      q3,
      q4,
      q5,
      q6,
      q7,
      q8,
      q9,
      q10,
      sum,
      enviar,
      observations,
      silver_id,
    } = req.body;
    let newLonelyForm = await LonelyForm.create(
      {
        date,
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        q9,
        q10,
        sum,
        enviar,
        observations,
        silver_id,
      },
      {
        fields: [
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
          "enviar",
          "observations",
          "silver_id",
        ],
      }
    );
    if (newLonelyForm) {
      return res.send({
        message: "Form created successfully",
        data: newLonelyForm,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while creating the form.",
    });
  }
};

export default {
  getById,
  create,
};
