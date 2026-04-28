const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  saveBookToLibrary,
  getUserLibrary,
  removeBookFromLibrary
} = require("../controllers/libraryController");

const router = express.Router();

router.post("/save", authMiddleware, saveBookToLibrary);
router.get("/", authMiddleware, getUserLibrary);
router.delete("/remove/:bookId", authMiddleware, removeBookFromLibrary);

module.exports = router;
