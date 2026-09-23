const express = require("express");

const {
    updateTick
} = require("../controllers/tickController");

const router = express.Router();

router.put("/update-tick", updateTick);

module.exports = router;