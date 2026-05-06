export const pages = {
  home: './index.html',
  login: './login.html',
  register: './register.html',
  dashboard: './dashboard.html',
};

export function setMessage(element, message, type = 'info') {
  if (!element) return;

  const styles = {
    success: 'message message-success',
    error: 'message message-error',
    info: 'message message-info',
  };

  element.textContent = message;
  element.className = styles[type] || styles.info;
  element.hidden = !message;
}

export function setButtonLoading(button, isLoading, loadingText = 'Please wait...') {
  if (!button) return;

  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
    return;
  }

  button.textContent = button.dataset.originalText || button.textContent;
  button.disabled = false;
}

export function getFormValues(form) {
  return Object.fromEntries(
    [...new FormData(form).entries()].map(([key, value]) => [
      key,
      key === 'password' ? value : value.trim(),
    ]),
  );
}

export function getUserFromResponse(response) {
  const data = response?.data;

  if (!data) return null;
  if (data.user) return data.user;
  if (data.loggedInUser) return data.loggedInUser;
  if (data.createdUser) return data.createdUser;

  return data;
}

export function renderUserProfile(container, user) {
  if (!container || !user) return;

  const rows = [
    ['Username', user.username],
    ['Email', user.email],
    ['Role', user.role],
    ['Full name', user.fullName],
    ['User ID', user._id || user.id],
    ['Created', user.createdAt ? new Date(user.createdAt).toLocaleString() : null],
  ].filter(([, value]) => value);

  container.innerHTML = rows
    .map(
      ([label, value]) => `
        <div class="profile-row">
          <span>${escapeHTML(label)}</span>
          <strong>${escapeHTML(value)}</strong>
        </div>
      `,
    )
    .join('');
}

export function redirectTo(path) {
  window.location.href = path;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
