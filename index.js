const express = require("express");
const app = express();
app.use(express.json());
const morgan = require("morgan");
app.use(morgan("dev"));
require("dotenv").config();
const connectDb = require("./config/connectDb");
const authMiddleware = require("./middleware/auth");
const User = require("./models/user.models");
const roleBase = require("./middleware/role-base");
app.use("/uploads", express.static("uploads"));
const cors = require("cors");
app.use(cors({
    origin: "http://localhost:5173", // ya jo bhi aapka frontend port hai (Vite=5173, CRA=3000)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]  // 👈 ye zaroori hai, warna Authorization header allowed nahi hoga
}));

app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/user"));
app.use("/task", require("./routes/task"));
app.use("/category", require("./routes/category"));
app.use("/status", require("./routes/status"));


app.get("/profile", authMiddleware, async (req, res) => {
    try {
        const email = req.User.email;
        if (!email) {
            return res.status(400).json({
                Message: "Email is Required"
            })
        }

        const userFindByEmail = await User.findOne({ email });
        if (!userFindByEmail) {
            return res.status(400).json({
                Message: "Email Is Requireed"
            })
        }

        return res.status(200).json({
            Message: "User Find Successfully",
            userFindByEmail
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            Message: "Server Error"
        })
    }

})



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is live in http://localhost:${PORT}`);
    connectDb();
})