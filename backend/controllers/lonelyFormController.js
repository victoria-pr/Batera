import Silver from "../models/silvers.js";
import LonelyForm from "../models/lonelyForm.js";
import Agent from "../models/agents.js";

const getAll = async (req, res) => {
  try {
    let lonelyForms = await LonelyForm.findAll({
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
    });
    res.send(lonelyForms);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving forms.",
    });
  }
};

const getById = async (req, res) => {
  try {
    const lon_form_id = req.params.id;
    let lonelyForm = await LonelyForm.findByPk(lon_form_id, {
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
            "new_valuation_date",
            "contact_person",
            "contact_p_relation",
            "contact_p_telephone",
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
    res.send(lonelyForm);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error ocurred while retrieving forms.",
    });
  }
};

const create = async (req, res) => {
  try {
    const silver_id = req.params.id;

    const newLonelyForm = await LonelyForm.create({
      silver_id: silver_id,
      date: req.body.date.split("T")[0],
      q1: req.body.q1,
      q2: req.body.q2,
      q3: req.body.q3,
      q4: req.body.q4,
      q5: req.body.q5,
      q6: req.body.q6,
      q7: req.body.q7,
      q8: req.body.q8,
      q9: req.body.q9,
      q10: req.body.q10,
      sum: req.body.sum,
      enviar: req.body.enviar,
      observations: req.body.observations,
    });

    if (newLonelyForm) {
      return res.status(201).json({
        message: "Form created successfully",
        data: newLonelyForm,
      });
    }
  } catch (error) {
    console.log("Este es el error al crear el formulario:", error);
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

const deleteForm = async (req, res) => {
  try {
    const formId = req.params.id;

    // Buscar el formulario por su ID
    const form = await LonelyForm.findByPk(formId);

    if (!form) {
      return res.status(404).json({
        message: "Form not found",
        data: {},
      });
    }

    // Eliminar el formulario
    await form.destroy();

    res.status(200).json({
      message: "Form deleted successfully",
      data: {},
    });
  } catch (error) {
    console.log("Este es el error al borrar el formulario:", error);
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

export default {
  getAll,
  getById,
  create,
  deleteForm,
  getAll,
};
