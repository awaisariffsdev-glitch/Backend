const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    contact: { type: String },
    email: { type: String, required: true },
    fullname: { type: String, required: true },
    image: { type: String },
    password: { type: String, required: true },

    role: {
        type: String,
        enum: ['admin', 'user'],
        defeault: 'user'
    }

}, { timestamps: true });


const User = mongoose.model("User", userSchema);
module.exports = User;