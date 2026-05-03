# 🛍️ Product Listing Interface

A modern React e-commerce application that displays a collection of products from the FreeAPI. Features a responsive grid layout, real-time search functionality, and loading states for a smooth user experience.

## 🎯 Features

- **Product Grid Display**: View all products in a responsive grid layout (1-4 columns based on screen size)
- **Real-time Search**: Filter products by title as you type
- **Product Cards**: Each product displays image, title, description, price, and buy button
- **Loading States**: Animated skeleton loaders while fetching data
- **Error Handling**: Graceful error messages if requests fail
- **Responsive Design**: Fully responsive on mobile, tablet, and desktop
- **Hover Effects**: Interactive hover animation on product cards
- **API Integration**: Fetches products from FreeAPI

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm (recommended) or npm

### Installation

1. Navigate to the project directory:

```bash
cd product-listing-interface
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
product-listing-interface/
├── src/
│   ├── App.jsx                    # Main application component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── vite.config.js                # Vite configuration
└── package.json                   # Project dependencies
```

## 🔧 How It Works

### Data Fetching

- Fetches products from FreeAPI on component mount using `useEffect`
- Displays loading skeleton while data is being fetched
- Shows error message if the request fails

### Search Functionality

- Implements real-time search using `useState`
- Filters products by title in a case-insensitive manner
- Updates results instantly as the user types
- Uses the `filteredProducts` variable to display only matching products

### Product Display

- Grid layout that adapts to screen size:
  - 1 column on mobile
  - 2 columns on small screens
  - 3 columns on medium screens
  - 4 columns on large screens
- Each product shows:
  - Product image (thumbnail)
  - Title
  - Description (limited to 2 lines)
  - Price in green
  - Buy button

## 📡 API Integration

The app uses the FreeAPI endpoint:

```
https://api.freeapi.app/api/v1/public/randomproducts
```

**Data Structure:**

- Returns an array of products with properties like title, description, price, thumbnail, and id
- Data is accessed via `data.data.data` path

## 🐛 Bugs Fixed

1. **Search Functionality Issue**:
   - **Problem**: The `filteredProducts` variable was created but the product grid was using `products.map()` instead of `filteredProducts.map()`
   - **Solution**: Changed the mapping to use `filteredProducts` so search filtering now works correctly

2. **Loading State Not Rendering**:
   - **Problem**: The loading skeleton code was in a detached JavaScript block that wasn't being rendered
   - **Solution**: Moved the loading state check into the JSX return statement with proper conditional rendering

## 📦 Technologies

- **React** - UI library with hooks
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Programming language

## 🎨 Components

### App Component

Main component that:

- Manages state for products, loading, error, and search
- Fetches products from the API
- Handles search filtering
- Renders loading skeleton, error messages, and product grid

## 💡 Key Implementation Details

- **State Management**: Uses React `useState` for products, loading, error, and search states
- **Effect Hook**: Uses `useEffect` to fetch products on component mount
- **Filtering**: Uses `Array.filter()` with case-insensitive title matching
- **Responsive Grid**: Uses Tailwind's grid system with responsive column counts
- **Loading Animation**: CSS animation (`animate-pulse`) for skeleton loaders

## 📝 Notes

- Products are displayed in both loading state (skeleton) and normal state (actual products)
- Search is case-insensitive for better user experience
- Error handling prevents app crashes when API requests fail
- The grid layout automatically adjusts based on viewport width using Tailwind breakpoints

## 📄 License

This project is part of the freeapi-react-projects collection.
