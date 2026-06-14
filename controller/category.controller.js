const Category = require("../models/categries.models");
const mongoose = require("mongoose");
const categoryAdd = async (req, res) => {
    try {
        const { color, name } = req.body;
        if (!color || !name) {
            return res.status(400).json({
                Message: "All fields are required"
            })
        }

        const newCaterory = new Category({
            color,
            name
        });

        await newCaterory.save();

        return res.status(200).json({
            Message: "Category Added"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}

const categoryFind = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        if (!id) {
            return res.status(400).json({
                Message: "Id Is Required"
            })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ Message: "Invalid Id Format" });
        }
        const categoryFindById = await Category.findById(id);


        return res.status(200).json({
            categoryFindById
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Messaeg: "Server Error"
        })
    }
}


const categoryUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const { color, name } = req.body;
        if (!id) {
            return res.status(400).json({
                Message: "Id Is Required"
            })
        }

        const categoryFindById = await Category.findByIdAndUpdate(id, { color, name });
        if (!categoryFindById) {
            return res.status(400).json({
                Message: "Id Is Required"
            })
        }

        return res.status(200).json({
            Message: "Update Successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}


const categoryDelete = async (req, res) => {

    try {
        const { color, name } = req.body;
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({
                Message: "Id Is Required"
            })
        }

        const categoryFindById = await Category.findByIdAndDelete(id);

        if (!categoryFindById) {
            return res.status(400).json({
                Messsage: "Id Is Required"
            })
        }

        return res.status(200).json({
            Message: "Category Is Delete Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }
}


module.exports = { categoryAdd, categoryFind, categoryUpdate, categoryDelete };