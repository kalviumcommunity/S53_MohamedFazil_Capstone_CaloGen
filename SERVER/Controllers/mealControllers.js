const getAllMeals = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "All meals have been retrieved from the database." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in receiving data", error: error.message });
  }
};

const getOneMealByID = async (req, res) => {
  try {
    const id = req.params.id;
    res
      .status(200)
      .json({ message: `Meal(${id}) has been retrieved from the database.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in receiving data", error: error.message });
  }
};

const postMeals = async (req, res) => {
  try {
    res.status(201).json(req.body);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in posting data", error: error.message });
  }
};

const updateMealID = async (req, res) => {
  try {
    const id = req.params.id;
    res
      .status(201)
      .json({ message: `Meal(${id}) has been updated.`, body: req.body });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in updating data", error: error.message });
  }
};

module.exports = { getAllMeals, getOneMealByID, postMeals, updateMealID };
