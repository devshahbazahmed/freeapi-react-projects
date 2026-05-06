import { useEffect, useMemo, useState } from 'react';
import './App.css';

const API_URL = 'https://api.freeapi.app/api/v1/public/meals';
const PAGE_LIMIT = 12;

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);

  const filteredMeals = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return meals;

    return meals.filter((meal) => {
      return (
        meal.strMeal?.toLowerCase().includes(query) ||
        meal.strCategory?.toLowerCase().includes(query) ||
        meal.strArea?.toLowerCase().includes(query) ||
        meal.strTags?.toLowerCase().includes(query)
      );
    });
  }, [meals, search]);

  const activeFilters = [selectedCategory, selectedArea].filter(Boolean).length;

  const updateFilterOptions = (mealList) => {
    const nextCategories = mealList.map((meal) => meal.strCategory).filter(Boolean);
    const nextAreas = mealList.map((meal) => meal.strArea).filter(Boolean);

    setCategories((current) => [
      ...new Set([...current, ...nextCategories]),
    ]);
    setAreas((current) => [...new Set([...current, ...nextAreas])]);
  };

  const fetchMeals = async (pageNum = 1, category = '', area = '') => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        page: pageNum,
        limit: PAGE_LIMIT,
      });

      if (category) params.append('category', category);
      if (area) params.append('area', area);

      const response = await fetch(`${API_URL}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch meals');
      }

      const nextMeals = data.data.data;

      setMeals(nextMeals);
      setTotalPages(data.data.totalPages || 1);
      setPage(pageNum);
      updateFilterOptions(nextMeals);
    } catch (err) {
      setError('Failed to load meals. Please try again in a moment.');
      console.error('Failed to fetch meals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMeals(1, selectedCategory, selectedArea);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedArea]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedArea('');
    setPage(1);
  };

  const handlePagination = (newPage) => {
    fetchMeals(newPage, selectedCategory, selectedArea);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#fff8ef] text-stone-950">
      <section className="meals-app-container">
        <header className="meal-hero">
          <div className="meal-hero-copy">
            <p className="kicker">Recipe finder</p>
            <h1>Find your next favorite meal</h1>
            <p>
              Browse a flavorful collection of dishes, filter by cuisine or
              category, and open any recipe for ingredients and cooking steps.
            </p>
          </div>

          <div className="hero-stats" aria-label="Meal browsing summary">
            <StatCard label="Meals" value={meals.length || '--'} />
            <StatCard label="Cuisines" value={areas.length || '--'} />
            <StatCard label="Page" value={`${page}/${totalPages}`} />
          </div>
        </header>

        <section className="filter-panel">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px_auto] lg:items-end">
            <label>
              <span>Search meals</span>
              <input
                type="search"
                value={search}
                placeholder="Search by recipe, tag, cuisine..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>

            <label>
              <span>Category</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Cuisine</span>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="">All cuisines</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </label>

            <button type="button" className="reset-button" onClick={clearFilters}>
              Reset
            </button>
          </div>

          <div className="filter-summary">
            <span>{filteredMeals.length} visible recipes</span>
            <span>{activeFilters} active filters</span>
          </div>
        </section>

        {error && <div className="error-banner">{error}</div>}

        {loading ? (
          <MealSkeleton />
        ) : (
          <>
            {filteredMeals.length > 0 && (
              <section className="meal-grid">
                {filteredMeals.map((meal, index) => (
                  <MealCard
                    key={meal.idMeal}
                    meal={meal}
                    index={index}
                    onSelect={setSelectedMeal}
                  />
                ))}
              </section>
            )}

            {!filteredMeals.length && !error && (
              <section className="empty-state">
                <p className="kicker">No matches</p>
                <h2>No meals found</h2>
                <p>Try another search term or clear your filters.</p>
              </section>
            )}
          </>
        )}

        {!loading && totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePagination}
          />
        )}
      </section>

      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function MealCard({ meal, index, onSelect }) {
  const tags = meal.strTags
    ? meal.strTags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 3)
    : [];

  return (
    <article
      className="meal-card"
      style={{ animationDelay: `${Math.min(index * 70, 560)}ms` }}
    >
      <button type="button" onClick={() => onSelect(meal)}>
        <div className="meal-image">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <span>{meal.strArea}</span>
        </div>

        <div className="meal-content">
          <div className="meal-heading">
            <p>{meal.strCategory}</p>
            <h2>{meal.strMeal}</h2>
          </div>

          {tags.length > 0 && (
            <div className="tag-row">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <div className="card-footer">
            <span>View recipe</span>
            <span aria-hidden="true">+</span>
          </div>
        </div>
      </button>
    </article>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (page <= 3) return i + 1;
    if (page >= totalPages - 2) return totalPages - 4 + i;
    return page - 2 + i;
  });

  return (
    <nav className="pagination" aria-label="Meal pages">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>

      <div>
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={page === pageNum ? 'active' : ''}
            aria-current={page === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </nav>
  );
}

function MealSkeleton() {
  return (
    <section className="meal-grid">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="meal-skeleton">
          <div />
          <div>
            <span />
            <span />
            <span />
          </div>
        </div>
      ))}
    </section>
  );
}

function MealModal({ meal, onClose }) {
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

  const instructions = meal.strInstructions
    ? meal.strInstructions
        .split(/\r?\n/)
        .map((instruction) => instruction.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section className="recipe-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close-button" onClick={onClose}>
          Close
        </button>

        <div className="modal-hero">
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <div>
            <p className="kicker">{meal.strCategory}</p>
            <h2>{meal.strMeal}</h2>
            <div>
              <span>{meal.strArea}</span>
              {meal.strTags
                ?.split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
                .slice(0, 2)
                .map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
            </div>
          </div>
        </div>

        <div className="recipe-body">
          <aside className="ingredients-panel">
            <p className="kicker">Ingredients</p>
            <ul>
              {ingredients.map((item) => (
                <li key={`${item.name}-${item.measure}`}>
                  <span>{item.name}</span>
                  <small>{item.measure}</small>
                </li>
              ))}
            </ul>
          </aside>

          <section className="instructions-panel">
            <p className="kicker">Method</p>
            {instructions.map((instruction, index) => (
              <p key={`${instruction}-${index}`}>{instruction}</p>
            ))}

            {meal.strYoutube && (
              <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                Watch recipe video
              </a>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}

export default App;
