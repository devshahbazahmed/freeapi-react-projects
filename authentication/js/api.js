const BASE_URL = '/api/v1/users';

export async function apiRequest(endpoint, method = 'GET', body = null) {
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
