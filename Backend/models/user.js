const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:  {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        // unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://https://ui-avatars.com/api/?background=0D8ABC&color=fff"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: "books",
    },],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: "books",
    },],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "order",
    },],
}, {timestamps: true});

module.exports = mongoose.model("user", user);