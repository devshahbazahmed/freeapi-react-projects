# Meals Listing Interface

A beautiful and interactive React application that displays a listing of delicious meals and recipes from around the world. Built with React, Vite, and Tailwind CSS, featuring filtering, pagination, and detailed recipe views with ingredients and instructions.

## 🌟 Features

### Main Features

- **Responsive Meal Grid**: Display meals in a beautiful 3-column grid (responsive for mobile/tablet)
- **Detailed Recipe Modal**: Click on any meal to view:
  - Full recipe instructions
  - Complete ingredient list with measurements
  - YouTube cooking video link
  - High-quality meal images
- **Filter by Category**: Filter meals by type (Vegetarian, Seafood, Chicken, Dessert, etc.)
- **Filter by Cuisine**: Filter meals by cuisine (Indian, Italian, Chinese, American, etc.)
- **Smart Pagination**: Navigate through all available meals with easy-to-use pagination controls
- **Meal Information Display**:
  - Meal name and thumbnail image
  - Category badge with emoji
  - Cuisine/Area badge
  - Popular tags
- **Loading States**: Smooth loading animation while fetching data
- **Error Handling**: User-friendly error messages with clear feedback
- **Ingredient Checklist**: Interactive checkboxes in recipe modal to track ingredients

## 📦 Tech Stack

- **React 19** - Modern JavaScript UI library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **JavaScript (ES6+)** - Modern JavaScript features

## 🛠 Installation

1. Navigate to the project directory:

   ```bash
   cd meals-listing-interface
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

The app will automatically:

1. Fetch initial meals from the API
2. Extract unique categories and cuisines
3. Display them in responsive grid layout
4. Allow filtering and pagination

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
├── App.jsx           # Main app component with state management & API calls
├── main.jsx          # React DOM entry point
├── App.css           # App-specific CSS (minimal, Tailwind handles most styling)
└── index.css         # Global styles with Tailwind CSS imports
```

## 📡 API Integration

The application fetches meals from the FreeAPI Meals endpoint:

```
https://api.freeapi.app/api/v1/public/meals
```

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Number of meals per page (default: 12)
- `category` - Filter by meal category (optional)
- `area` - Filter by cuisine/area (optional)

### Response Structure

The API returns meal data including:

- `idMeal` - Unique meal identifier
- `strMeal` - Meal name
- `strCategory` - Meal category
- `strArea` - Cuisine/geographical origin
- `strInstructions` - Detailed cooking instructions
- `strMealThumb` - Meal thumbnail image URL
- `strIngredient1-20` - Ingredient names
- `strMeasure1-20` - Ingredient measurements
- `strYoutube` - YouTube video link (if available)
- `strTags` - Comma-separated tags

## 🎨 Design Features

### Styling Highlights

- **Gradient backgrounds** for visual appeal
- **Responsive card layout** with hover effects
- **Color-coded badges** for categories and cuisines
- **Emoji indicators** for quick meal type recognition
- **Smooth animations** and transitions
- **Modal dialog** for detailed recipe views
- **Interactive pagination** with active state indicators
- **Mobile-first responsive design**

### Color Scheme

- **Primary**: Orange/Red gradient (Orange-500 to Red-500)
- **Background**: Orange/Red/Yellow gradient
- **Accents**: Blue badges for cuisines
- **Neutral**: Gray tones for text and borders

## 📋 Component Architecture

### App Component

- Manages global state (meals, loading, error, filters, pagination)
- Handles API fetch logic with query parameters
- Manages filter state and pagination
- Extracts unique categories and areas from API response
- Renders header with filters and main meal grid

### MealCard Component

- Displays individual meal preview
- Shows meal image, name, category, and area
- Displays tags and quick-view button
- Triggers modal on click
- Includes hover effects and animations

### MealModal Component

- Full-screen modal overlay
- Displays detailed meal information
- Two-column layout: ingredients left, instructions right
- Interactive ingredient checklist
- YouTube link button
- Close button and overlay click to dismiss

## ✨ User Experience

### Filter Flow

1. User selects category (optional) and/or cuisine (optional)
2. Click "Apply Filters" button
3. App fetches filtered meals and resets to page 1
4. Grid updates with filtered results

### Pagination Flow

1. View meals on current page
2. Click previous/next buttons or page number
3. Page smoothly scrolls to top
4. New meals load with smooth transition

### Recipe Viewing

1. Click on any meal card
2. Modal opens with full recipe details
3. Review ingredients with checkboxes
4. Read step-by-step instructions
5. Watch cooking video on YouTube
6. Close modal by clicking button or clicking outside

## 🌐 Browser Support

Works on all modern browsers:

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

- **Mobile** (< 768px): 1 column layout, full-width elements
- **Tablet** (768px - 1024px): 2 column grid layout
- **Desktop** (> 1024px): 3 column grid layout

## 🔄 Future Enhancements

Potential features for future development:

- Search bar for meal name search
- Favorite/bookmark meals
- Rating and reviews system
- Save recipes locally
- Share recipes via social media
- Nutritional information display
- Diet type filtering (Vegan, Keto, etc.)
- Recipe scaling calculator

## 📝 Notes

- Meals are fetched from the FreeAPI meals database
- YouTube links are provided by the API when available
- Images are optimized for fast loading
- Ingredients are extracted dynamically from the API response
- All data is fetched from the public API (no authentication required)

## 📜 License

This project is part of the FreeAPI React Projects collection.
