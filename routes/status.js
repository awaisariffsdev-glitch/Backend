const express = require("express");
const {statusAdd, statusFind, statusUpdate, statusDelete} = require("../controller/status.controller");
const router = express.Router();

router.post("/statusAdd",statusAdd);
router.get("/statusFind/:id",statusFind);
router.put("/statusUpdate/:id",statusUpdate);
router.delete("/statusDelete/:id",statusDelete);
module.exports=router;