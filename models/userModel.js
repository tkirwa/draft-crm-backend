const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        phone: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return /^\d{10,}$/.test(value); // Check if phone has at least 10 digits
                },
                message: "Phone must have at least 10 digits",
            },
        },
        email: {type: String, unique: true},
        password: {type: String, required: true},
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        // settings: { type: mongoose.Schema.Types.ObjectId, ref: 'Settings' },
        settings: {
            darkMode: {type: Boolean, default: false},
            language: {type: String, default: "English"},
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


// Custom method to update user settings
UserSchema.methods.updateSettings = async function (newSettings) {
    try {
        // Ensure 'settings' is an object
        this.settings = this.settings || {};

        // Update user settings
        this.settings.darkMode = newSettings.darkMode || this.settings.darkMode;
        this.settings.language = newSettings.language || this.settings.language;

        // Save the user
        await this.save();

        return {message: "User settings updated successfully"};
    } catch (error) {
        console.error("Error updating user settings:", error);
        throw new Error("Failed to update user settings");
    }
};

module.exports = mongoose.model("User", UserSchema);
