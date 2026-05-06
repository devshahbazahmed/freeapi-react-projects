import { apiRequest } from './api.js';

const USER_KEY = 'authUser';
const ACCESS_TOKEN_KEY = 'authAccessToken';
const REFRESH_TOKEN_KEY = 'authRefreshToken';

export const registerUser = (formData) =>
  apiRequest('/register', 'POST', formData);

export const loginUser = (formData) => apiRequest('/login', 'POST', formData);

export const logoutUser = () => apiRequest('/logout', 'POST');

export const getCurrentUser = () => apiRequest('/current-user');

export function saveSessionUser(user, response = null) {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  const accessToken = response?.data?.accessToken;
  const refreshToken = response?.data?.refreshToken;

  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }

  if (refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
}

export function clearSessionUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function getSavedSessionUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}
