const axios = require("axios");

const searchBooks = async (req, res) => {
  const query = (req.query.q || "").trim();

  if (!query) {
    return res.status(400).json({ message: "Query parameter q is required." });
  }

  try {
    const params = { q: query };
    if (process.env.GOOGLE_BOOKS_API_KEY) {
      params.key = process.env.GOOGLE_BOOKS_API_KEY;
    }

    const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
      params
    });

    const items = Array.isArray(response.data.items) ? response.data.items : [];
    const books = items.map((item) => {
      const info = item.volumeInfo || {};
      return {
        googleId: item.id || "",
        title: info.title || "",
        authors: Array.isArray(info.authors) ? info.authors : [],
        description: info.description || "",
        pageCount: info.pageCount || null,
        coverImage: info.imageLinks?.thumbnail || ""
      };
    });

    return res.status(200).json(books);
  } catch (error) {
    console.error("GOOGLE API ERROR:", error.message);
    return res.status(502).json({ message: "Failed to fetch books." });
  }
};

module.exports = {
  searchBooks
};
