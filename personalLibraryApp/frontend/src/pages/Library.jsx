import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export default function Library() {
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
  });

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/library", {
          headers: getAuthHeaders()
        });
        setLibrary(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setMessage("Could not load your library.");
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const handleShelfChange = async (bookId, nextShelf) => {
    try {
      await axios.patch(
        `http://localhost:5001/api/library/update-shelf/${bookId}`,
        { shelf: nextShelf },
        { headers: getAuthHeaders() }
      );

      setLibrary((prev) =>
        prev.map((item) =>
          item.book?._id === bookId ? { ...item, shelf: nextShelf } : item
        )
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update shelf.");
    }
  };

  const handleRemove = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5001/api/library/remove/${bookId}`, {
        headers: getAuthHeaders()
      });
      setLibrary((prev) => prev.filter((item) => item.book?._id !== bookId));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to remove book.");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div>Loading your library...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <h1>My Library</h1>
        {message ? <p>{message}</p> : null}

        {!library.length ? (
          <p>
            Your library is empty. Start adding books from the{" "}
            <Link to="/search">Search page</Link>.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
              gap: "14px"
            }}
          >
            {library.map((item) => (
              <article
                key={item.book?._id || item._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}
              >
                {item.book?.coverImage ? (
                  <Link to={`/library/${item.book?._id}`}>
                    <img
                      src={item.book.coverImage}
                      alt={item.book.title || "Book cover"}
                      style={{ width: "100%", height: "220px", objectFit: "cover" }}
                    />
                  </Link>
                ) : (
                  <div style={{ width: "100%", height: "220px", background: "#f2f2f2" }} />
                )}
                <h3 style={{ margin: 0 }}>
                  <Link to={`/library/${item.book?._id}`}>{item.book?.title || "Untitled"}</Link>
                </h3>
                <p style={{ margin: 0 }}>
                  {(item.book?.authors && item.book.authors.join(", ")) || "Unknown author"}
                </p>
                <p style={{ margin: 0 }}>Format: {item.format}</p>
                <select
                  value={item.shelf}
                  onChange={(event) => handleShelfChange(item.book?._id, event.target.value)}
                >
                  <option value="To Read">To Read</option>
                  <option value="Currently Reading">Currently Reading</option>
                  <option value="Read">Read</option>
                </select>
                <button
                  type="button"
                  onClick={() => handleRemove(item.book?._id)}
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px",
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
