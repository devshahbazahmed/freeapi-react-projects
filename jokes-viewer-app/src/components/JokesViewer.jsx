/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';

const API_URL = 'https://api.freeapi.app/api/v1/public/randomjokes';

function JokesViewer() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(API_URL);
      const data = await res.json();

      if (!data.success) throw new Error('Failed to fetch joke');

      const random = Math.floor(Math.random() * 10);

      const content = data.data.data[random];
      setJoke(content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">😂 Random Joke</h1>

        {loading && <p className="text-gray-500">Loading...</p>}

        {error && <p className="text-red-500 mb-2">Error: {error}</p>}

        {joke && !loading && (
          <div className="space-y-3">
            <p className="text-lg font-medium">{joke.content}</p>
          </div>
        )}

        <button
          onClick={fetchJoke}
          className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Next Joke
        </button>
      </div>
    </div>
  );
}

export default JokesViewer;
