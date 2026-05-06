import {
  clearSessionUser,
  getCurrentUser,
  getSavedSessionUser,
  loginUser,
  logoutUser,
  registerUser,
  saveSessionUser,
} from './auth.js';
import {
  getFormValues,
  getUserFromResponse,
  pages,
  redirectTo,
  renderUserProfile,
  setButtonLoading,
  setMessage,
} from './ui.js';

const registerForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const logoutButton = document.querySelector('#logoutButton');
const refreshUserButton = document.querySelector('#refreshUserButton');
const profileContainer = document.querySelector('#profileDetails');
const messageElement = document.querySelector('#message');
const cachedUser = getSavedSessionUser();

if (profileContainer && cachedUser) {
  renderUserProfile(profileContainer, cachedUser);
}

async function loadCurrentUser({ redirectOnFail = false } = {}) {
  if (!profileContainer) return;

  setMessage(messageElement, 'Checking your active session...', 'info');

  try {
    const response = await getCurrentUser();
    const user = getUserFromResponse(response);

    if (!user) {
      throw new Error('No active user was returned by the API.');
    }

    saveSessionUser(user, response);
    renderUserProfile(profileContainer, user);
    setMessage(messageElement, 'You are logged in.', 'success');
  } catch (error) {
    clearSessionUser();
    profileContainer.innerHTML = `
      <div class="empty-state">
        <h2>No active session</h2>
        <p>Please log in again to view your profile details.</p>
        <a class="button button-primary" href="${pages.login}">Go to login</a>
      </div>
    `;
    setMessage(messageElement, error.message, 'error');

    if (redirectOnFail) {
      setTimeout(() => redirectTo(pages.login), 900);
    }
  }
}

registerForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const button = registerForm.querySelector('button[type="submit"]');
  const formData = getFormValues(registerForm);

  setMessage(messageElement, '', 'info');
  setButtonLoading(button, true, 'Creating account...');

  try {
    const response = await registerUser(formData);
    const user = getUserFromResponse(response);

    saveSessionUser(user, response);
    setMessage(
      messageElement,
      'Account created successfully. Redirecting to login...',
      'success',
    );
    registerForm.reset();

    setTimeout(() => redirectTo(pages.login), 900);
  } catch (error) {
    setMessage(messageElement, error.message, 'error');
  } finally {
    setButtonLoading(button, false);
  }
});

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const button = loginForm.querySelector('button[type="submit"]');
  const formData = getFormValues(loginForm);

  setMessage(messageElement, '', 'info');
  setButtonLoading(button, true, 'Signing in...');

  try {
    const response = await loginUser(formData);
    const user = getUserFromResponse(response);

    saveSessionUser(user, response);
    setMessage(messageElement, 'Login successful. Opening dashboard...', 'success');

    setTimeout(() => redirectTo(pages.dashboard), 700);
  } catch (error) {
    clearSessionUser();
    setMessage(messageElement, error.message, 'error');
  } finally {
    setButtonLoading(button, false);
  }
});

logoutButton?.addEventListener('click', async () => {
  setButtonLoading(logoutButton, true, 'Logging out...');

  try {
    await logoutUser();
    clearSessionUser();
    setMessage(messageElement, 'Logged out successfully.', 'success');
    setTimeout(() => redirectTo(pages.login), 700);
  } catch (error) {
    setMessage(messageElement, error.message, 'error');
  } finally {
    setButtonLoading(logoutButton, false);
  }
});

refreshUserButton?.addEventListener('click', async () => {
  setButtonLoading(refreshUserButton, true, 'Refreshing...');
  await loadCurrentUser();
  setButtonLoading(refreshUserButton, false);
});

if (profileContainer) {
  loadCurrentUser();
}
