import React, { useState } from "react";
import axios from "axios";
import MainLayout from "../components/layout/MainLayout";

export default function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFormats, setSelectedFormats] = useState({});

  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) {
      setMessage("Please enter a title or author.");
      setBooks([]);
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await axios.get(
        `http://localhost:5001/api/books/search?q=${encodeURIComponent(trimmed)}`
      );
      setBooks(Array.isArray(response.data) ? response.data : []);
      if (!response.data?.length) {
        setMessage("No books found.");
      }
    } catch (error) {
      setBooks([]);
      setMessage("Search failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBook = async (book) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must log in before saving books.");
      return;
    }

    const format = selectedFormats[book.googleId] || "Paperback";

    try {
      await axios.post(
        "http://localhost:5001/api/library/save",
        { ...book, format },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Book saved successfully.");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to save book.";
      alert(msg);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1>Search Books</h1>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or author"
          />
          <button type="button" onClick={handleSearch} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {message ? <p>{message}</p> : null}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "12px"
          }}
        >
          {books.map((book) => (
            <div
              key={book.googleId}
              style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}
            >
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  style={{ width: "100%", height: "220px", objectFit: "cover" }}
                />
              ) : (
                <div style={{ height: "220px", background: "#f2f2f2" }} />
              )}
              <h3 style={{ margin: "10px 0 6px" }}>{book.title}</h3>
              <p style={{ margin: 0 }}>
                {(book.authors && book.authors.join(", ")) || "Unknown author"}
              </p>
              <select
                value={selectedFormats[book.googleId] || "Paperback"}
                onChange={(event) =>
                  setSelectedFormats((prev) => ({
                    ...prev,
                    [book.googleId]: event.target.value
                  }))
                }
                style={{ marginTop: "10px", width: "100%" }}
              >
                <option value="Hardcover">Hardcover</option>
                <option value="Paperback">Paperback</option>
                <option value="Ebook">Ebook</option>
                <option value="Audiobook">Audiobook</option>
              </select>
              <button
                type="button"
                onClick={() => handleSaveBook(book)}
                style={{ marginTop: "10px" }}
              >
                Save to Library
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
