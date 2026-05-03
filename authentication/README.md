# FreeAPI Authentication

A vanilla JavaScript authentication app built with HTML, CSS, and the FreeAPI Authentication Module.

## Features

- Register a new user
- Login with username and password
- View the current authenticated user
- Logout and clear local profile state
- Success and error messages
- Loading states on form actions
- Clean responsive UI
- Local proxy server to avoid browser CORS issues with credentialed requests

## API Endpoints

The app uses these FreeAPI endpoints:

```text
POST /api/v1/users/register
POST /api/v1/users/login
POST /api/v1/users/logout
GET  /api/v1/users/current-user
```

The local proxy forwards those requests to:

```text
https://api.freeapi.app
```

## Project Structure

```text
authentication/
  css/
    styles.css
  html/
    index.html
    login.html
    register.html
    dashboard.html
  js/
    api.js
    auth.js
    main.js
    ui.js
  server.mjs
  README.md
```

## Getting Started

Run the local proxy and static server:

```bash
node server.mjs
```

Open the app:

```text
http://127.0.0.1:8090/html/index.html
```

Do not open the HTML files directly with `file://`, and do not use a plain static server for this project. The auth requests need to go through `server.mjs`.

## Why The Proxy Is Needed

The FreeAPI auth endpoints use cookies for session handling. Browser requests with cookies require strict CORS headers. Since the API responds in a way that browsers reject for credentialed cross-origin requests, direct frontend calls can fail with:

```text
Failed to fetch
```

`server.mjs` fixes that by serving the frontend and proxying API requests from the same local origin:

```text
http://127.0.0.1:8090
```

That lets the browser treat API calls as same-origin requests while the server forwards them to FreeAPI.

## How It Works

1. `register.html` submits username, email, password, and role.
2. `login.html` submits username and password.
3. `dashboard.html` calls the current-user endpoint to show the active profile.
4. The logout button calls the logout endpoint and clears the locally cached user.

The API helper is in `js/api.js`, auth endpoint wrappers are in `js/auth.js`, and page behavior is handled by `js/main.js`.
