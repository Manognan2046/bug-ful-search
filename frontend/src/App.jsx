import { useState } from "react";
import WordResult from "./components/WordResult.jsx";
import "./App.css";

const API_URL = "https://searchee.onrender.com/api/chat";

function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchWord(event) {
    event.preventDefault();
    const searchTerm = word.trim();

    if (!searchTerm || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: searchTerm }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The word could not be looked up.");
      }

      if (typeof data.answer !== "string") {
        throw new Error("The response did not contain a word analysis.");
      }

      let analysis;
      try {
        analysis = JSON.parse(data.answer);
      } catch {
        throw new Error("The response could not be read. Please try again.");
      }

      if (!analysis || typeof analysis !== "object" || !analysis.word) {
        throw new Error("The response did not contain a valid word analysis.");
      }

      setResult(analysis);
    } catch (requestError) {
      console.error(requestError);
      setError(requestError.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Wordwell home">
          <span className="brand-mark" aria-hidden="true">W</span>
          <span>wordwell</span>
        </a>
        <span className="topbar-note">A little more meaning, every day.</span>
      </header>

      <section className="search-intro" aria-labelledby="page-title">
        <div className="eyebrow"><span className="eyebrow-line" /> THE WORD, WELL UNDERSTOOD</div>
        <h1 id="page-title">Every word has<br /><span>a story.</span></h1>
        <p className="intro-copy">
          Discover what a word means, where it came from, and the ideas it carries.
        </p>

        <form className="search-form" onSubmit={searchWord}>
          <label className="sr-only" htmlFor="word-search">Look up a word</label>
          <span className="search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </span>
          <input
            id="word-search"
            type="text"
            value={word}
            onChange={(event) => setWord(event.target.value)}
            placeholder="Try a word, like “serendipity”"
            autoComplete="off"
          />
          <button type="submit" disabled={loading || !word.trim()}>
            {loading ? (
              <>
                <span className="button-spinner" aria-hidden="true" />
                Looking up
              </>
            ) : (
              <>Explore <span aria-hidden="true">↗</span></>
            )}
          </button>
        </form>
        <div className="search-hint"><span className="hint-dot" /> Pronunciation · origins · meaning · related words</div>
      </section>

      <div className="content-area" aria-live="polite">
        {error && (
          <div className="error-message" role="alert">
            <span className="error-icon" aria-hidden="true">!</span>
            <div>
              <strong>We couldn’t find that word.</strong>
              <p>{error}</p>
            </div>
          </div>
        )}
        {loading && (
          <div className="loading-state" role="status">
            <span className="loading-orbit" aria-hidden="true" />
            <span>Following the word’s story...</span>
          </div>
        )}
        {result && <WordResult analysis={result} />}
        {!result && !loading && !error && (
          <div className="empty-state">
            <span className="empty-ornament" aria-hidden="true">Aa</span>
            <p>Your next favorite word is one search away.</p>
          </div>
        )}
      </div>

      <footer className="site-footer">
        <span>Made for the curious.</span>
        <span className="footer-divider" aria-hidden="true">·</span>
        <span>Words are worlds.</span>
      </footer>
    </main>
  );
}

export default App;
