const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { saveBookToLibrary } = require("../controllers/libraryController");

const router = express.Router();

router.post("/save", authMiddleware, saveBookToLibrary);

module.exports = router;
