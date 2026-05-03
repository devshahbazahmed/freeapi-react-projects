# Random Users Card

A beautiful React application that fetches and displays random user profiles from the FreeAPI Random Users API. Built with React, Vite, and Tailwind CSS.

## 🌟 Features

- **User Cards Display**: Beautiful, responsive user profile cards with a gradient design
- **Real API Integration**: Fetches random users from [FreeAPI Random Users](https://api.freeapi.app/api/v1/public/randomusers)
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Interactive Elements**: Clickable email and phone links for easy contact
- **Loading States**: Smooth loading spinner animation while fetching data
- **Error Handling**: User-friendly error messages with retry capability
- **Load More**: Fetch additional users with the "Load More Users" button
- **Country Flags**: Display country flags for each user's nationality
- **Smooth Animations**: Hover effects with shadows and scale transformations

## 📋 User Card Information

Each user card displays:

- Profile picture
- Full name with title
- Gender and age
- Email address (clickable)
- Phone number (clickable)
- City and state
- Country with flag emoji
- Nationality code

## 🛠 Tech Stack

- **React 19** - UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript

## 📦 Installation

1. Clone the repository or navigate to the project directory:

   ```bash
   cd random-users-card
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## 🚀 Getting Started

### Development Server

Start the development server with hot module replacement:

```bash
pnpm dev
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
pnpm build
```

### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

### Linting

Run ESLint to check code quality:

```bash
pnpm lint
```

## 📁 Project Structure

```
src/
├── App.jsx           # Main app component with user fetching logic
├── main.jsx          # React DOM entry point
└── index.css         # Global styles with Tailwind CSS imports
```

## 🎨 Styling

The application uses **Tailwind CSS** for all styling:

- Gradient backgrounds (`from-blue-50 to-indigo-100`)
- Responsive grid layouts (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- Hover effects and transitions
- Shadow effects for depth
- Color scheme: Blues, indigos, and purples

## 📡 API Integration

The application fetches from:

```
https://api.freeapi.app/api/v1/public/randomusers
```

**Response includes:**

- 10 random user profiles per request
- User details (name, email, phone, location, picture, etc.)
- Pagination information
- Success status and message

## ✨ Component Architecture

### App Component

- Manages state for users, loading, and error conditions
- Handles API fetch logic
- Renders user grid and load more button

### UserCard Component

- Displays individual user profile
- Handles country flag mapping
- Presents contact information with icons
- Shows location and nationality details

## 🌐 Browser Support

Works on all modern browsers:

- Chrome/Edge
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is part of the FreeAPI React Projects collection.
