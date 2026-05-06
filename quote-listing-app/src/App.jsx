import { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import Loader from './components/Loader';

const API_URL = 'https://api.freeapi.app/api/v1/public/quotes';

const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateNewQuote = () => {
    if (!quotes.length) return;
    setRandomQuote(getRandom(quotes));
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await axios.get(API_URL);
        const data = res.data.data.data;

        setQuotes(data);
        setRandomQuote(getRandom(data));
      } catch (err) {
        setError('Failed to fetch quotes. Please try again in a moment.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Curated words for brighter thinking</p>
          <h1>Quotes Gallery</h1>
          <p className="hero-text">
            Browse a polished collection of ideas, then shuffle the spotlight
            card when you need a fresh line of perspective.
          </p>
        </div>

        <div className="stats-card" aria-label="Quote collection summary">
          <span className="stats-number">{quotes.length || '--'}</span>
          <span className="stats-label">quotes loaded</span>
        </div>
      </section>

      {randomQuote && (
        <section className="spotlight-section" aria-label="Quote generator">
          <div className="section-heading">
            <p className="eyebrow">Spotlight</p>
            <h2>Quote Generator</h2>
          </div>

          <div className="spotlight-layout">
            <QuoteCard quote={randomQuote} featured />

            <div className="generator-card">
              <p>
                Tap through the collection and let the next card slide into the
                spotlight.
              </p>
              <button onClick={generateNewQuote} className="primary-button">
                New Quote
              </button>
            </div>
          </div>
        </section>
      )}

      {loading && <Loader />}
      {error && <p className="error-message">{error}</p>}

      <section className="gallery-section" aria-label="All quotes">
        <div className="section-heading">
          <p className="eyebrow">Collection</p>
          <h2>Cards to keep close</h2>
        </div>

        <div className="quotes-grid">
          {quotes.map((q, index) => (
            <QuoteCard key={q._id} quote={q} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
