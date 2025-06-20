import { useState, useEffect } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import "../index.css";

// Helper to fetch all user's URLs
const fetchMyUrls = () => api('/api/create/my');

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShort] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [myUrls, setMyUrls] = useState([]);
  const { user } = useAuth();

  // Fetch list after login or after new link created
  useEffect(() => {
    if (user) refreshList();
    // eslint-disable-next-line
  }, [user]);

  const refreshList = async () => {
    try {
      const res = await fetchMyUrls();
      if (res.ok) setMyUrls(await res.json());
      else setMyUrls([]);
    } catch {
      setMyUrls([]);
    }
  };

  // Handle create short URL
  const handleShorten = async () => {
    setError("");
    setShort("");
    if (!/^https?:\/\//i.test(url)) {
      setError("Please enter a valid URL (include http/https)");
      return;
    }
    setLoading(true);
    try {
      const res = await api("/api/create", {
        method: "POST",
        body: { url },
      });
      if (!res.ok) throw new Error();
      const data = await res.text();
      setShort(data);
      refreshList();   // update the table below
    } catch {
      setError("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* URL Shortener Card */}
      <div className="card">
        <h1 className="card__title">URL Shortener</h1>

        <input
          className="input"
          type="url"
          placeholder="Paste your long URL here…"
          value={url}
          onChange={e => setUrl(e.target.value)}
          disabled={loading}
        />

        <button className="btn" onClick={handleShorten} disabled={loading}>
          {loading ? "Shortening…" : "Shorten URL"}
        </button>

        {shortUrl && (
          <div className="short-url">
            <strong>Short URL: </strong>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>

      {/* User's Link List Card */}
      {myUrls.length > 0 && (
        <div className="card mt-2">
          <h2 className="card__title" style={{ fontSize: "1.25rem" }}>
            Your Shortened Links
          </h2>
          <table style={{
            width: "100%",
            fontSize: ".97rem",
            borderCollapse: "collapse"
          }}>
            <thead>
              <tr>
                <th>Short</th>
                <th>Original</th>
                <th style={{ textAlign: "center" }}>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {myUrls.map(u => (
                <tr key={u._id}>
                  <td>
                    <a
                      href={u.shortUrl.startsWith("http") ? u.shortUrl : `${window.location.origin}/${u.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#4f46e5" }}
                    >
                      {u.shortUrl}
                    </a>
                  </td>
                  <td style={{ wordBreak: "break-all" }}>{u.originalUrl}</td>
                  <td style={{ textAlign: "center" }}>{u.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}