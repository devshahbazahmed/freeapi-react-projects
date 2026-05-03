# 😂 Jokes Viewer App

A simple and elegant React application that fetches and displays random jokes from the FreeAPI. Perfect for a quick laugh or learning how to build interactive React components with API integration.

## 🎯 Features

- **Random Joke Display**: Fetch and display a new random joke with each request
- **Loading State**: Shows a loading indicator while fetching jokes
- **Error Handling**: Graceful error messages if something goes wrong
- **Beautiful UI**: Modern gradient design with Tailwind CSS styling
- **Smooth Experience**: Interactive button to get the next joke

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm (recommended) or npm

### Installation

1. Navigate to the project directory:

```bash
cd jokes-viewer-app
```

2. Install dependencies:

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
pnpm build
```

### Preview

Preview the production build:

```bash
pnpm preview
```

## 📚 Project Structure

```
jokes-viewer-app/
├── src/
│   ├── components/
│   │   └── JokesViewer.jsx      # Main joke display component
│   ├── App.jsx                   # Root component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── vite.config.js               # Vite configuration
└── package.json                  # Project dependencies
```

## 🔧 How It Works

The `JokesViewer` component:

1. Fetches jokes from the [FreeAPI](https://api.freeapi.app) random jokes endpoint
2. Selects a random joke from the response
3. Displays the joke with a setup and punchline format
4. Allows users to fetch new jokes with the "Next Joke" button

### API Integration

The app uses the FreeAPI endpoint:

```
https://api.freeapi.app/api/v1/public/randomjokes
```

## 🎨 Technologies

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Programming language

## 📝 Notes

- The app includes proper error handling for failed API requests
- Loading states prevent multiple simultaneous requests
- Uses React hooks (useState, useEffect) for state management
- Responsive design works on mobile and desktop

## 📄 License

This project is part of the freeapi-react-projects collection.
