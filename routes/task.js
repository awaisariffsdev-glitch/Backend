const express = require("express");
const { taskAdd, taskFind, taskUpdate, taskdelete, findAll } = require("../controller/task.controller");
const authMiddleware = require("../middleware/auth");
const router = express.Router();


router.post("/taskAdd",authMiddleware,taskAdd);
router.get("/findAll",findAll)
router.get("/taskFind/:id",taskFind);
router.put("/taskUpdate/:id",taskUpdate);
router.delete("/taskDelete/:id",taskdelete);




module.exports = router;