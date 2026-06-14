const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL 

const connectDb = async ()=>{
    try {
        if(!DB_URL){
            throw new Error("URL Not Found ");

        }
        await mongoose.connect(DB_URL);
        console.log("DB Connected Connected");
    } catch (error) {
        console.log(error);
        console.log("DB Not Coneected ")
    }
}

module.exports = connectDb;