/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  const fetchMeals = async (pageNum = 1, category = '', area = '') => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.append('page', pageNum);
      params.append('limit', 12);

      if (category) params.append('category', category);
      if (area) params.append('area', area);

      const response = await fetch(
        `https://api.freeapi.app/api/v1/public/meals?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setMeals(data.data.data);
        setTotalPages(data.data.totalPages);
        setPage(pageNum);

        // Extract unique categories and areas
        if (pageNum === 1) {
          const uniqueCategories = [
            ...new Set(data.data.data.map((meal) => meal.strCategory)),
          ].filter(Boolean);
          const uniqueAreas = [
            ...new Set(data.data.data.map((meal) => meal.strArea)),
          ].filter(Boolean);

          setCategories(uniqueCategories);
          setAreas(uniqueAreas);
        }
      } else {
        throw new Error(data.message || 'Failed to fetch meals');
      }
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch meals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals(1, selectedCategory, selectedArea);
  }, [selectedCategory, selectedArea]);

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMeals(1, selectedCategory, selectedArea);
  };

  const handlePagination = (newPage) => {
    fetchMeals(newPage, selectedCategory, selectedArea);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🍽️ Meals Listing
            </h1>
            <p className="text-gray-600 mt-2">
              Discover delicious recipes from around the world
            </p>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cuisine
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
              >
                <option value="">All Cuisines</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleFilter}
                className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8 text-center">
            <p className="font-semibold text-lg">⚠️ Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600"></div>
              <p className="mt-4 text-gray-700 font-semibold text-lg">
                Loading delicious meals...
              </p>
            </div>
          </div>
        )}

        {/* Meals Grid */}
        {!loading && meals.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {meals.map((meal) => (
                <MealCard
                  key={meal.idMeal}
                  meal={meal}
                  onSelect={setSelectedMeal}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mb-12">
                <button
                  onClick={() => handlePagination(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 transition"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePagination(pageNum)}
                        className={`px-3 py-2 rounded-lg font-bold transition ${
                          page === pageNum
                            ? 'bg-orange-600 text-white'
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-500'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePagination(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && meals.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 font-semibold">
              No meals found. Try adjusting your filters! 🥘
            </p>
          </div>
        )}
      </main>

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
}

function MealCard({ meal, onSelect }) {
  const categoryEmoji = {
    Vegetarian: '🥗',
    Seafood: '🦐',
    Chicken: '🍗',
    Beef: '🍖',
    Pasta: '🍝',
    Dessert: '🍰',
    Breakfast: '🍳',
    Soup: '🍲',
    Vegan: '🌱',
    Miscellaneous: '🍽️',
    Pork: '🐷',
  };

  const emoji = categoryEmoji[meal.strCategory] || '🍽️';
  const tags = meal.strTags
    ? meal.strTags
        .split(',')
        .slice(0, 2)
        .map((tag) => tag.trim())
    : [];

  return (
    <div
      onClick={() => onSelect(meal)}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:scale-105 cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 flex-1 text-left line-clamp-2">
            {meal.strMeal}
          </h3>
          <span className="text-2xl ml-2">{emoji}</span>
        </div>

        {/* Category & Area */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <span className="inline-block bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">
            {meal.strCategory}
          </span>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {meal.strArea}
          </span>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View Recipe Button */}
        <button className="w-full bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 rounded-lg transition duration-200">
          View Recipe
        </button>
      </div>
    </div>
  );
}

function MealModal({ meal, onClose }) {
  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient,
        measure: measure || '',
      });
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
        >
          ✕
        </button>

        {/* Header Image */}
        <div className="relative h-80 bg-gray-200 overflow-hidden">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{meal.strMeal}</h1>
            <div className="flex gap-3 flex-wrap">
              <span className="bg-orange-500 px-4 py-2 rounded-full font-semibold">
                {meal.strCategory}
              </span>
              <span className="bg-blue-500 px-4 py-2 rounded-full font-semibold">
                {meal.strArea}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Ingredients */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🧂 Ingredients
              </h2>
              <ul className="space-y-3">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 w-4 h-4 text-orange-600 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.measure}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                👨‍🍳 Instructions
              </h2>
              <div className="prose prose-sm max-w-none">
                {meal.strInstructions.split('\r\n').map(
                  (instruction, index) =>
                    instruction.trim() && (
                      <p
                        key={index}
                        className="text-gray-700 mb-3 leading-relaxed"
                      >
                        {instruction.trim()}
                      </p>
                    )
                )}
              </div>

              {/* YouTube Link */}
              {meal.strYoutube && (
                <a
                  href={meal.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                >
                  ▶️ Watch on YouTube
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 flex justify-end gap-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
