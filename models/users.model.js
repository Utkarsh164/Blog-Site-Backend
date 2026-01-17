const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // Ensures no duplicate emails
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Enforces a minimum length for passwords
        },
    },
    { timestamps: true }
);

// Pre-save middleware for password hashing
userSchema.pre("save", async function (next) {
    try {
        if (!this.isModified("password")) return next(); // Skip hashing if password not modified
        const salt = await bcrypt.genSalt(10); // Generate salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error); // Pass errors to the next middleware
    }
});

// to create any function we use schemaName.methods.function-name
userSchema.methods.verifyPassword=async function(enteredPassword) {
    return await  bcrypt.compare(enteredPassword,this.password);
}
module.exports = mongoose.model("Users", userSchema);
