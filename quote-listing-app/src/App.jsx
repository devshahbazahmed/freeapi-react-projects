/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import Loader from './components/Loader';

const API_URL = 'https://api.freeapi.app/api/v1/public/quotes';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch quotes list
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await axios.get(API_URL);
      const data = res.data.data.data;

      setQuotes(data);
      setRandomQuote(getRandom(data));
    } catch (err) {
      setError('Failed to fetch quotes.', err);
    } finally {
      setLoading(false);
    }
  };

  // Get random quote
  const getRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const generateNewQuote = () => {
    setRandomQuote(getRandom(quotes));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-8">✨ Quotes Gallery</h1>

      {/* Random Quote Section */}
      {randomQuote && (
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Quote Generator
          </h2>

          <QuoteCard quote={randomQuote} />

          <div className="flex justify-center mt-4">
            <button
              onClick={generateNewQuote}
              className="px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition hover:cursor-pointer"
            >
              New Quote
            </button>
          </div>
        </div>
      )}

      {/* States */}
      {loading && <Loader />}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Quotes Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {quotes.map((q) => (
          <QuoteCard key={q._id} quote={q} />
        ))}
      </div>
    </div>
  );
}

export default App;
