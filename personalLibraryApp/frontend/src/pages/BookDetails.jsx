import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export default function BookDetails() {
  const { bookId } = useParams();
  const [item, setItem] = useState(null);
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/library/details/${bookId}`,
          {
            headers: getAuthHeaders()
          }
        );
        const data = response.data;
        setItem(data);
        setNotes(data.notes || "");
        setRating(typeof data.rating === "number" ? data.rating : 0);
      } catch (error) {
        setMessage("Could not load book details.");
      }
    };

    fetchDetails();
  }, [bookId]);

  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:5001/api/library/details/${bookId}`,
        { notes, rating: Number(rating) },
        { headers: getAuthHeaders() }
      );
      setMessage("Saved!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save changes.");
    }
  };

  const titleQuery = item?.book?.title || "";
  const authorQuery = item?.book?.authors?.[0] || "";
  const purchaseQuery = encodeURIComponent(`${titleQuery} ${authorQuery}`.trim());
  const amazonUrl = `https://www.amazon.com/s?k=${purchaseQuery}`;
  const barnesUrl = `https://www.barnesandnoble.com/s/${purchaseQuery}`;

  return (
    <MainLayout>
      {!item ? (
        <div>{message || "Loading details..."}</div>
      ) : (
        <div className="pl-detailsGrid">
          {item.book?.coverImage ? (
            <img
              src={item.book.coverImage}
              alt={item.book.title || "Book cover"}
              className="pl-coverDetails"
            />
          ) : (
            <div className="pl-coverPlaceholderDetails" />
          )}
          <div>
            <h1 style={{ marginTop: 0 }}>{item.book?.title || "Untitled"}</h1>
            <p>{(item.book?.authors && item.book.authors.join(", ")) || "Unknown author"}</p>
            <p>Format: {item.format}</p>
            <div style={{ marginTop: "16px" }}>
              <label htmlFor="notes">Personal Notes</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={6}
                className="pl-textarea"
                style={{ marginTop: "6px" }}
              />
            </div>
            <div style={{ marginTop: "12px" }}>
              <label htmlFor="rating">Rating (0-5)</label>
              <select
                id="rating"
                value={rating}
                onChange={(event) => setRating(Number(event.target.value))}
                className="pl-select"
                style={{ marginLeft: "8px" }}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="pl-btn pl-btn-primary"
              style={{ marginTop: "16px" }}
            >
              Save Changes
            </button>
            <section style={{ marginTop: "18px" }}>
              <h3 style={{ marginBottom: "8px" }}>Purchase Options</h3>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <a
                  href={amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pl-btn pl-btn-primary"
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  Buy on Amazon
                </a>
                <a
                  href={barnesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pl-btn pl-btn-primary"
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  Buy on Barnes & Noble
                </a>
              </div>
            </section>
            {message ? <p className="pl-muted" style={{ marginTop: "10px" }}>{message}</p> : null}
          </div>
        </div>
      )}
    </MainLayout>
  );
}
