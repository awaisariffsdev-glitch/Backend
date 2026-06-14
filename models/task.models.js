const mongoose = require("mongoose");
const User = require("./user.models");
const Category = require("../models/categries.models");
const Status = require("../models/status.models");
const taskSchema = mongoose.Schema({
    categoryId: { type: mongoose.SchemaTypes.ObjectId, ref: "Category" },
    description: { type: String, required: true },
    dueDate: { type: String, required: true },
    dueTime: { type: String, required: true },
    progress: { type: String, required: true },
    statusId: { type: mongoose.SchemaTypes.ObjectId, ref: 'Status' },
    title: { type: String, required: true },
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;