/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCat = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        'https://api.freeapi.app/api/v1/public/cats/cat/random'
      );
      console.log(res.data.data);

      setCat(res.data.data);
    } catch (err) {
      setError('Failed to load cat 😿', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Random Cat Viewer 🐱</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        {loading && (
          <div className="w-full h-64 bg-gray-300 animate-pulse rounded-lg"></div>
        )}
        {error && <p className="text-red-500">{error}</p>}

        {cat && !loading && (
          <img
            src={cat.image}
            alt="Random Cat"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        <button
          onClick={fetchCat}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50 hover:cursor-pointer active:scale-95"
        >
          {loading ? 'Loading...' : 'Load New Cat'}
        </button>
      </div>
    </div>
  );
}

export default App;
