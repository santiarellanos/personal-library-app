const Book = require("../models/Book");
const User = require("../models/User");

const saveBookToLibrary = async (req, res) => {
  const { googleId, title, authors, description, pageCount, coverImage, format, shelf } = req.body;

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
      user.savedBooks.push({ book: book._id, format, shelf: shelf || "To Read" });
      await user.save();
    }

    return res.status(200).json({ message: "Book saved successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save book." });
  }
};

const updateBookShelf = async (req, res) => {
  const { bookId } = req.params;
  const { shelf } = req.body;
  const allowedShelves = ["To Read", "Currently Reading", "Read"];

  if (!allowedShelves.includes(shelf)) {
    return res.status(400).json({ message: "Invalid shelf value." });
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId, "savedBooks.book": bookId },
      {
        $set: {
          "savedBooks.$.shelf": shelf
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Book not found in library." });
    }

    return res.status(200).json({ message: "Shelf updated successfully.", shelf });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update shelf." });
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

const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("savedBooks.book");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const savedBooks = user.savedBooks || [];
    const stats = savedBooks.reduce(
      (acc, item) => {
        if (item.shelf === "Read") {
          acc.booksRead += 1;
          acc.totalPagesRead += item.book?.pageCount || 0;
        }
        if (item.shelf === "Currently Reading") {
          acc.booksCurrentlyReading += 1;
        }
        return acc;
      },
      {
        totalBooks: savedBooks.length,
        booksRead: 0,
        booksCurrentlyReading: 0,
        totalPagesRead: 0
      }
    );

    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load user stats." });
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

const getBookDetails = async (req, res) => {
  const { bookId } = req.params;

  try {
    const user = await User.findById(req.user.userId).populate("savedBooks.book");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const item = user.savedBooks.find(
      (savedBook) => savedBook.book?._id?.toString() === bookId
    );
    if (!item) {
      return res.status(404).json({ message: "Book not found in library." });
    }

    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load book details." });
  }
};

const updateBookDetails = async (req, res) => {
  const { bookId } = req.params;
  const { notes, rating } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId, "savedBooks.book": bookId },
      {
        $set: {
          "savedBooks.$.notes": notes ?? "",
          "savedBooks.$.rating": typeof rating === "number" ? rating : 0
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Book not found in library." });
    }

    return res.status(200).json({ message: "Book details updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update book details." });
  }
};

module.exports = {
  saveBookToLibrary,
  getUserLibrary,
  getUserStats,
  removeBookFromLibrary,
  updateBookShelf,
  getBookDetails,
  updateBookDetails
};
