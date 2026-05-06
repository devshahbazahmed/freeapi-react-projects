const BASE_URL = '/api/v1/users';
const ACCESS_TOKEN_KEY = 'authAccessToken';

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function apiRequest(endpoint, method = 'GET', body = null) {
  const accessToken = getAccessToken();
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (accessToken) {
    options.headers.Authorization = `Bearer ${accessToken}`;
  }

  let res;

  try {
    res = await fetch(`${BASE_URL}${endpoint}`, options);
  } catch {
    throw new Error(
      'Request failed. Start the local proxy with "node server.mjs" and open http://127.0.0.1:8090/html/index.html.',
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong. Please try again.');
  }

  return data;
}
