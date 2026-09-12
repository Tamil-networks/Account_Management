const express = require("express");
const router = express.Router();

const {
    searchAccounts
} = require("../controllers/searchController");

router.get("/search", searchAccounts);

module.exports = router;