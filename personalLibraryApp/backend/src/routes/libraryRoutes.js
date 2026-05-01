const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  saveBookToLibrary,
  getUserLibrary,
  getUserStats,
  removeBookFromLibrary,
  updateBookShelf,
  getBookDetails,
  updateBookDetails
} = require("../controllers/libraryController");

const router = express.Router();

router.post("/save", authMiddleware, saveBookToLibrary);
router.get("/stats", authMiddleware, getUserStats);
router.get("/", authMiddleware, getUserLibrary);
router.get("/details/:bookId", authMiddleware, getBookDetails);
router.patch("/details/:bookId", authMiddleware, updateBookDetails);
router.delete("/remove/:bookId", authMiddleware, removeBookFromLibrary);
router.patch("/update-shelf/:bookId", authMiddleware, updateBookShelf);

module.exports = router;
