import { useEffect, useState } from 'react';

const API_URL = 'https://api.freeapi.app/api/v1/public/randomjokes';

function JokesViewer() {
  const [joke, setJoke] = useState(null);
  const [jokeCount, setJokeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await fetch(API_URL);
      const data = await res.json();

      if (!data.success) throw new Error('Failed to fetch joke');

      const jokes = data.data.data;
      const randomIndex = Math.floor(Math.random() * jokes.length);

      setJoke(jokes[randomIndex]);
      setJokeCount((count) => count + 1);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJoke();
  }, []);

  return (
    <main className="joke-shell">
      <section className="joke-stage">
        <div className="joke-copy">
          <p className="joke-kicker">Instant humor desk</p>
          <h1>One clean card. One fresh joke.</h1>
          <p>
            Tap through random jokes from FreeAPI with a calmer reading layout,
            polished states, and a little motion when each line arrives.
          </p>
        </div>

        <article className="joke-card">
          <div className="joke-card-top">
            <span>Random Joke</span>
            <strong>{jokeCount || '--'}</strong>
          </div>

          <div className="joke-content">
            {loading && (
              <div className="joke-skeleton" aria-label="Loading joke">
                <span />
                <span />
                <span />
              </div>
            )}

            {error && <p className="joke-error">{error}</p>}

            {joke && !loading && !error && (
              <p key={joke.id || joke.content} className="joke-text">
                {joke.content}
              </p>
            )}
          </div>

          <button type="button" onClick={fetchJoke} disabled={loading}>
            {loading ? 'Loading...' : 'Next Joke'}
          </button>
        </article>
      </section>
    </main>
  );
}

export default JokesViewer;
