import { useState, useEffect } from 'react';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://api.freeapi.app/api/v1/public/randomusers'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.data.data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Random Users
          </h1>
          <p className="text-gray-600 text-lg">
            Discover random user profiles from around the world
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-2xl mx-auto">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-700 font-semibold">
                Loading users...
              </p>
            </div>
          </div>
        )}

        {/* Users Grid */}
        {!loading && users.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {users.map((user) => (
                <UserCard key={user.login.uuid} user={user} />
              ))}
            </div>

            {/* Fetch More Button */}
            <div className="flex justify-center">
              <button
                onClick={fetchUsers}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
              >
                {loading ? 'Loading...' : 'Load More Users'}
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No users found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const { name, email, phone, picture, gender, location, dob, nat } = user;

  const getCountryFlag = (country) => {
    const flagMap = {
      'United States': '🇺🇸',
      Canada: '🇨🇦',
      'United Kingdom': '🇬🇧',
      Australia: '🇦🇺',
      India: '🇮🇳',
      'New Zealand': '🇳🇿',
      Netherlands: '🇳🇱',
      Switzerland: '🇨🇭',
      Spain: '🇪🇸',
      Iran: '🇮🇷',
      Serbia: '🇷🇸',
      Ukraine: '🇺🇦',
      France: '🇫🇷',
      Germany: '🇩🇪',
      Brazil: '🇧🇷',
      Mexico: '🇲🇽',
      Ireland: '🇮🇪',
      Norway: '🇳🇴',
      Denmark: '🇩🇰',
      Sweden: '🇸🇪',
      Finland: '🇫🇮',
      Portugal: '🇵🇹',
      Italy: '🇮🇹',
      Greece: '🇬🇷',
      Turkey: '🇹🇷',
      Russia: '🇷🇺',
      Japan: '🇯🇵',
      'South Korea': '🇰🇷',
      China: '🇨🇳',
      Thailand: '🇹🇭',
      Singapore: '🇸🇬',
    };
    return flagMap[country] || '🌍';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105">
      {/* Profile Image */}
      <div className="relative bg-linear-to-r from-indigo-400 to-purple-500 h-24">
        <img
          src={picture.large}
          alt={`${name.first} ${name.last}`}
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg absolute left-1/2 top-4 transform -translate-x-1/2"
        />
      </div>

      {/* Content */}
      <div className="pt-16 pb-6 px-6 text-center">
        {/* Name */}
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {name.title} {name.first} {name.last}
        </h2>

        {/* Gender & Age */}
        <p className="text-sm text-gray-500 mb-4">
          <span className="inline-block mr-3">
            {gender === 'male' ? '👨' : '👩'} {gender}
          </span>
          <span>Age: {dob.age}</span>
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Contact Info */}
        <div className="space-y-3 text-left mb-4">
          <div className="flex items-center text-gray-700">
            <span className="text-lg mr-3">✉️</span>
            <a
              href={`mailto:${email}`}
              className="text-indigo-600 hover:underline break-all text-sm"
            >
              {email}
            </a>
          </div>
          <div className="flex items-center text-gray-700">
            <span className="text-lg mr-3">📱</span>
            <a
              href={`tel:${phone}`}
              className="text-indigo-600 hover:underline text-sm"
            >
              {phone}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Location Info */}
        <div className="text-left space-y-2 text-sm text-gray-700">
          <div className="flex items-start">
            <span className="text-lg mr-3">📍</span>
            <div>
              <p className="font-semibold">
                {location.city}, {location.state}
              </p>
              <p className="text-gray-500">
                {getCountryFlag(location.country)} {location.country}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">Nationality: {nat}</span>
        <span className="text-lg">{getCountryFlag(location.country)}</span>
      </div>
    </div>
  );
};

export default App;
