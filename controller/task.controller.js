const Task = require("../models/task.models");
const mongoose = require("mongoose");


// const taskAdd = async (req, res) => {
//     try {
//         const { categoryId, description, dueDate, dueTime, progress, statusId, title, userId } = req.body;
//         if (!description || !dueDate || !dueTime || !progress || !title) {
//             return res.status(400).json({
//                 Message: "All Fields Are Required"
//             })
//         }

//         const newTask = new Task({
//             categoryId,
//             description,
//             dueDate,
//             dueTime,
//             progress,
//             statusId,
//             title,
//             userId


//         });

//         await newTask.save();
//         return res.status(201).json({
//             Message: "Task Add successfully"
//         })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             Message: "Server Error"
//         })
//     }
// }

const taskAdd = async (req, res) => {
    try {
        const { categoryId, description, dueDate, dueTime, progress, statusId, title } = req.body;
        if (!description || !dueDate || !dueTime || !progress || !title) {
            return res.status(400).json({
                Message: "All Fields Are Required"
            })
        }

        const newTask = new Task({
            categoryId,
            description,
            dueDate,
            dueTime,
            progress,
            statusId,
            title,
            userId: req.User._id
        });

        await newTask.save();
        return res.status(201).json({
            Message: "Task Add successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}

const findAll = async (req, res) => {
    try {

        const findAll = await Task.find({ userId: req.User.id });
        // console.log("Filtered result:", findAll);
        return findAll;
        // console.log(req.User);
        return res.status(200).json(findAll)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}

// const findAll = async (req, res) => {
//     try {
//         const findAll = await Task.find({ userId: req.User.id});
//         return res.status(200).json(findAll)
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             Message: "Server Error"
//         })
//     }
// }
const taskFind = async (req, res) => {
    try {
        const id = req.params.id;


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                Message: "Invalid Id Format"
            });
        }

        const taskFindById = await Task.findById(id);
        if (!taskFindById) {
            return res.status(400).json({
                Message: "Id is Required"
            })
        }


        return res.status(200).json({
            Message: "Task Find Successfully",
            taskFindById
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}


const taskUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const { description, dueDate, dueTime, progress, title } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                Message: "Invalid Id Format"
            });
        }


        const taskUpdateById = await Task.findByIdAndUpdate(id, { description, dueDate, dueTime, progress, title });

        return res.status(200).json({
            Message: "Task Update Successfully"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}

const taskdelete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                Message: "Id is required"
            })
        }

        const taskDeleteById = await Task.findByIdAndDelete(id);

        return res.status(200).json({
            Message: "Task Delete Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}


module.exports = {
    taskAdd, taskFind, taskUpdate, taskdelete, findAll
}