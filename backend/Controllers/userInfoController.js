const createDatabaseForUser = require("../Models/createDatabaseForUser");

const userData = async (req, res) => {
  try {
    // Call the function to create the database and collection
    const result = await createDatabaseForUser(req.body);

    if (result.success) {
      res.status(200).json({
        message: "Account created successfully",
        data: req.body,
      });
    } else {
      res.status(400).json({
        message: result.message,
      });
    }
  } catch (error) {
    console.error("Error handling user data:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { userData };
