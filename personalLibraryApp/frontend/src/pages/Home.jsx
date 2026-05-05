import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

export default function Home() {
  const [library, setLibrary] = useState([]);
  const [message, setMessage] = useState("");
  const username = localStorage.getItem("username");

  const toReadPreview = useMemo(
    () => library.filter((item) => item.shelf === "To Read").slice(0, 4),
    [library]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLibrary([]);
      return;
    }

    const fetchLibrary = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/library", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLibrary(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setMessage("Could not load your dashboard preview.");
      }
    };

    fetchLibrary();
  }, []);

  return (
    <MainLayout>
      <div>
        <section className="pl-bookCard" style={{ padding: "20px", marginBottom: "20px" }}>
          <h1 style={{ marginTop: 0 }}>Welcome back, {username || "Reader"}!</h1>
          <p className="pl-muted">Jump back into your next great story.</p>
          <Link to="/search" className="pl-btn pl-btn-primary" style={{ display: "inline-block" }}>
            Find Books
          </Link>
        </section>

        <section>
          <h2>To Read Preview</h2>
          {message ? <p>{message}</p> : null}
          {!toReadPreview.length ? (
            <p>Your "To Read" list is empty. Time to find your next great read!</p>
          ) : (
            <div
              className="pl-grid"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
            >
              {toReadPreview.map((item) => (
                <article
                  key={item.book?._id || item._id}
                  className="pl-bookCard"
                  style={{ padding: "0 12px 14px" }}
                >
                  {item.book?.coverImage ? (
                    <img src={item.book.coverImage} alt={item.book?.title || "Book cover"} className="pl-cover" />
                  ) : (
                    <div className="pl-coverPlaceholder" />
                  )}
                  <div className="pl-cardBody">
                    <h3 style={{ margin: 0 }}>{item.book?.title || "Untitled"}</h3>
                    <p style={{ margin: 0 }} className="pl-muted">
                      {(item.book?.authors && item.book.authors.join(", ")) || "Unknown author"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
