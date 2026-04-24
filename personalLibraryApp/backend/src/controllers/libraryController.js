const Book = require("../models/Book");
const User = require("../models/User");

const saveBookToLibrary = async (req, res) => {
  const { googleId, title, authors, description, pageCount, coverImage } = req.body;

  if (!googleId) {
    return res.status(400).json({ message: "googleId is required." });
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
      (savedId) => savedId.toString() === book._id.toString()
    );
    if (!alreadySaved) {
      user.savedBooks.push(book._id);
      await user.save();
    }

    return res.status(200).json({ message: "Book saved successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save book." });
  }
};

module.exports = {
  saveBookToLibrary
};
