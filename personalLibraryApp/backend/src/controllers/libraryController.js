const Book = require("../models/Book");
const User = require("../models/User");

const saveBookToLibrary = async (req, res) => {
  const { googleId, title, authors, description, pageCount, coverImage, format } = req.body;

  if (!googleId) {
    return res.status(400).json({ message: "googleId is required." });
  }
  if (!format) {
    return res.status(400).json({ message: "format is required." });
  }

  try {
    let book = await Book.findOne({ googleId });
    if (!book) {
      book = await Book.create({
        googleId,
        title: title || "",
        authors: Array.isArray(authors) ? authors : [],
        description: description || "",
        pageCount: typeof pageCount === "number" ? pageCount : null,
        coverImage: coverImage || ""
      });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const alreadySaved = user.savedBooks.some(
      (savedBook) => savedBook.book.toString() === book._id.toString()
    );
    if (!alreadySaved) {
      user.savedBooks.push({ book: book._id, format });
      await user.save();
    }

    return res.status(200).json({ message: "Book saved successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save book." });
  }
};

const getUserLibrary = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("savedBooks.book");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    return res.status(200).json(user.savedBooks || []);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load library." });
  }
};

const removeBookFromLibrary = async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await User.updateOne(
      { _id: req.user.userId },
      {
        $pull: {
          savedBooks: { book: bookId }
        }
      }
    );

    return res.status(200).json({ message: "Book removed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove book." });
  }
};

module.exports = {
  saveBookToLibrary,
  getUserLibrary,
  removeBookFromLibrary
};
