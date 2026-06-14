const express = require("express");
const {categoryAdd, categoryFind, categoryUpdate, categoryDelete} = require("../controller/category.controller");
const router=express.Router();


router.post("/categoryAdd",categoryAdd);
router.get("/categoryFind/:id",categoryFind);
router.put("/categoryUpdate/:id",categoryUpdate);
router.delete("/categoryDelete/:id",categoryDelete);


module.exports = router;