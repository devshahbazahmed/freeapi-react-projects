import { apiRequest } from './api.js';

export const registerUser = (formData) =>
  apiRequest('/register', 'POST', formData);

export const loginUser = (formData) => apiRequest('/login', 'POST', formData);

export const logoutUser = () => apiRequest('/logout', 'POST');

export const getCurrentUser = () => apiRequest('/current-user');

export function saveSessionUser(user) {
  if (!user) return;
  localStorage.setItem('authUser', JSON.stringify(user));
}

export function clearSessionUser() {
  localStorage.removeItem('authUser');
}

export function getSavedSessionUser() {
  try {
    return JSON.parse(localStorage.getItem('authUser'));
  } catch {
    return null;
  }
}
