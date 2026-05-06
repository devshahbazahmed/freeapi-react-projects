import { useEffect, useMemo, useState } from 'react';

const API_URL = 'https://api.freeapi.app/api/v1/public/randomusers';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;

    return users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return (
        fullName.includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.location.country.toLowerCase().includes(query) ||
        user.location.city.toLowerCase().includes(query)
      );
    });
  }, [search, users]);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.data.data);
    } catch (err) {
      setError('Failed to fetch users. Please try again in a moment.');
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  return (
    <main className="users-shell">
      <section className="users-hero">
        <div>
          <p className="users-kicker">Global profiles</p>
          <h1>Random Users Directory</h1>
          <p>
            Browse generated profile cards with cleaner contact details, quick
            filtering, and a layout that keeps the cards easy to scan.
          </p>
        </div>

        <div className="users-stats">
          <Stat label="Loaded" value={users.length || '--'} />
          <Stat label="Visible" value={filteredUsers.length || '--'} />
          <Stat label="Countries" value={countCountries(users) || '--'} />
        </div>
      </section>

      <section className="users-toolbar">
        <label>
          <span>Search</span>
          <input
            type="search"
            value={search}
            placeholder="Name, email, city, or country"
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <button type="button" onClick={fetchUsers} disabled={loading}>
          {loading ? 'Loading...' : 'Refresh Users'}
        </button>
      </section>

      {error && <p className="users-error">{error}</p>}

      {loading ? (
        <UsersSkeleton />
      ) : (
        <>
          {filteredUsers.length > 0 && (
            <section className="users-grid">
              {filteredUsers.map((user, index) => (
                <UserCard key={user.login.uuid} user={user} index={index} />
              ))}
            </section>
          )}

          {!filteredUsers.length && !error && (
            <section className="users-empty">
              <h2>No users found</h2>
              <p>Try a different search term or refresh the list.</p>
            </section>
          )}
        </>
      )}
    </main>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <strong>{value}</strong>
    <span>{label}</span>
  </div>
);

const UserCard = ({ user, index }) => {
  const { name, email, phone, picture, gender, location, dob, nat } = user;

  return (
    <article
      className="user-card"
      style={{ animationDelay: `${Math.min(index * 70, 560)}ms` }}
    >
      <div className="user-cover">
        <img src={picture.large} alt={`${name.first} ${name.last}`} />
      </div>

      <div className="user-content">
        <div className="user-name-row">
          <div>
            <p>{nat}</p>
            <h2>
              {name.first} {name.last}
            </h2>
          </div>
          <span>{dob.age}</span>
        </div>

        <div className="user-meta">
          <span>{gender}</span>
          <span>{location.country}</span>
        </div>

        <div className="user-contact">
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone}`}>{phone}</a>
        </div>

        <div className="user-location">
          <span>Location</span>
          <strong>
            {location.city}, {location.state}
          </strong>
        </div>
      </div>
    </article>
  );
};

function UsersSkeleton() {
  return (
    <section className="users-grid">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="user-skeleton">
          <div />
          <span />
          <span />
          <span />
        </div>
      ))}
    </section>
  );
}

function countCountries(users) {
  return new Set(users.map((user) => user.location.country)).size;
}

export default App;
