const User = require("../models/userModel");

exports.listAllUsers = (req, res) => {
  try {
    // Access the users array attached by the middleware
    const users = req.users;

    // Now you can use the 'users' array as needed
    res.status(200).json({ users });
  } catch (error) {
    console.error(error); // Log the error to the console for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user by ID:", error);
    res.status(500).json({ error: "Failed to get user by ID" });
  }
};

exports.editUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details with the new data
    Object.assign(user, req.body);

    // Save the updated user
    await user.save();

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error editing user:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ errors: extractValidationErrors(error) });
    }

    res.status(500).json({ error: "Failed to edit user" });
  }
};

exports.getUserSettingsById = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract and send user settings
    const userSettings = user.settings || {};
    res.status(200).json({ userSettings });
  } catch (error) {
    console.error("Error getting user settings by ID:", error);
    res.status(500).json({ error: "Failed to get user settings by ID" });
  }
};

exports.updateUserSettingsById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const newSettings = req.body; // Assuming the request body contains the new settings

    // Find the user by _id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Use the custom method to update user settings
    const result = await user.updateSettings(newSettings);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating user settings:", error);
    res.status(500).json({ error: "Failed to update user settings" });
  }
};
