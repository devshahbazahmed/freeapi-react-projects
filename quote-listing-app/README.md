# ✨ Quotes Listing App

A beautiful React application that displays a collection of inspiring quotes in an interactive gallery format. Features a quote generator to display random quotes and a responsive grid layout showcasing all available quotes.

## 🎯 Features

- **Random Quote Generator**: Display a random quote from the collection with a "New Quote" button
- **Quotes Gallery**: Browse all quotes in a responsive grid layout
- **API Integration**: Fetch quotes from the FreeAPI
- **Loading States**: Visual feedback while fetching data
- **Error Handling**: Graceful error messages if requests fail
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Beautiful UI**: Modern design with Tailwind CSS styling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm (recommended) or npm

### Installation

1. Navigate to the project directory:

```bash
cd quote-listing-app
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
quote-listing-app/
├── src/
│   ├── components/
│   │   ├── QuoteCard.jsx         # Quote card component
│   │   └── Loader.jsx             # Loading spinner component
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── vite.config.js                # Vite configuration
└── package.json                   # Project dependencies
```

## 🔧 How It Works

The application consists of two main sections:

### Quote Generator Section

- Displays a single random quote in a prominent card
- "New Quote" button generates a new random quote from the fetched collection
- Positioned at the top for maximum visibility

### Quotes Gallery Section

- Grid layout showing all available quotes
- Responsive design: 3 columns on medium screens, 2 on small screens
- Each quote displayed in a card format
- Loads after the quote generator section

## 📡 API Integration

The app uses the FreeAPI endpoint:

```
https://api.freeapi.app/api/v1/public/quotes
```

**Data Structure:**

- Fetches a collection of quotes with metadata
- Each quote contains content, author, and unique identifier
- Supports random selection from the collection

## 📦 Dependencies

- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **Tailwind CSS** - Utility-first CSS framework

## 🎨 Components

### QuoteCard

Reusable component that displays a single quote with:

- Quote content
- Author attribution
- Styled card layout

### Loader

Loading spinner component displayed while fetching quotes from the API

### App

Main component that:

- Manages global state (quotes, random quote, loading, error)
- Handles API requests
- Renders both the generator and gallery sections

## 📝 Notes

- The app fetches quotes on component mount using the `useEffect` hook
- Random quote selection uses a utility function `getRandom()`
- Axios is used instead of native fetch for cleaner HTTP handling
- Tailwind CSS provides responsive design and styling
- Error states are handled gracefully with user-friendly messages

## 📄 License

This project is part of the freeapi-react-projects collection.
