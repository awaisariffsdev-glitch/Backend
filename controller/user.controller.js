const User = require("../models/user.models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
    try {
        const { contact, email, fullname, password, role } = req.body;
        if (!contact || !email || !fullname || !password) {
            return res.status(400).json({
                Message: "All fields are required"
            })
        }

        const userFind = await User.findOne({ email });
        if (userFind) {
            return res.status(409).json({
                Message: "User Already Existed"
            })
        }

        const hashPassword = await bcrypt.hash(password, 13);

        const newUser = new User({
            email,
            password: hashPassword,
            contact,
            fullname,
            image: req.file ? req.file.path : null,
            role
        });

        await newUser.save();

        return res.status(201).json({
            Message: "User Registered Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server error"
        })
    }
}



const userLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(req.body);
        if (!email || !password) {
            return res.status(400).json({
                Message: "All fields are required"
            })
        }


        const userFind = await User.findOne({ email });
        if (!userFind) {
            return res.status(400).json({
                Message: "User Not found"
            })
        }

        const isCompare = await bcrypt.compare(password, userFind.password);
        if (!isCompare) {
            return res.status(400).json({
                Message: "Password is incorrected"
            })
        }



        const payload = ({
            email,
            fullname: userFind.fullname,
            contact: userFind.contact,
            // role: userFind.role
        });
        // console.log(payload);

        const SCERCT_KEY = process.env.SCERCT_KEY;
        const token = jwt.sign(payload, SCERCT_KEY, { expiresIn: "7d" });

        // localStorage.setItem(token)
        return res.status(200).json({
            Message: "User LogIn Successfully",
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }

}




module.exports = {
    userSignUp, userLogIn
}