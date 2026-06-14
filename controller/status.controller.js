const Status = require("../models/status.models");
const mongoose = require("mongoose");

const statusAdd = async (req, res) => {
    try {
        const { icon, name } = req.body;
        if (!icon || !name) {
            return res.status(400).json({
                Message: "All fields are required"
            })
        }


        const newStatus = new Status({
            icon,
            name
        })
        await newStatus.save();

        return res.status(201).json({
            Message: "Status Added"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}

const statusFind = async (req, res) => {
    try {

        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                Message: "Id Is Required 1"
            })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "Invalid Id Format" });
        }
        const statusFindById = await Status.findById(id);
        if (!statusFindById) {
            return res.status(400).json({
                Message: "Id Is required 2"
            })
        }

        return res.status(200).json({
            Message: "Status find Successfully",
            statusFindById
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}

const statusUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const { icon, name } = req.body;
        if (!id) {
            return res.status(400).json({
                Message: "Id Is Required"
            })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "Invalid Id Format" });
        }
        if(!icon||!name){
            return res.status(400).json({
                Message:"All Fields Are required"
            })
        }
        const statusFindById = await Status.findByIdAndUpdate(id, { icon, name });
        if (!statusFindById) {
            return res.status(400).json({
                Message: "Id is required"
            })
        }


        return res.status(200).json({
            Message: "Status Edit Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                Messaeg: "Server Error"

            }
        )
    }
}


const statusDelete = async (req, res) => {
    try {
        const { icon, name } = req.body;
        const id = req.params.id;
        console.log(id);
        if (!id) {
            return res.status(400).json({
                Message: "Id iS Required"
            })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "Invalid Id Format" });
        }

        const statusFind = await Status.findByIdAndDelete(id);
        if (!statusFind) {
            return res.status(400).json({
                Message: "Id Is Required"
            })
        }

        return res.status(200).json({
            Message: "Status Delete Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
};

module.exports = { statusAdd, statusFind, statusUpdate, statusDelete };