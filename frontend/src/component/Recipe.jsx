import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import Loader from "./Loader";

function Recipe() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [visibleRecipeIndex, setVisibleRecipeIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const apiId = import.meta.env.VITE_API_ID;
      const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${apiId}&app_key=${apiKey}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Data not found");
      }
      const parsedData = await response.json();
      setRecipes(parsedData.hits);
      console.log(parsedData.hits)
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecipeVisibility = (index) => {
    setVisibleRecipeIndex(visibleRecipeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-emerald-800 mb-12 drop-shadow-sm">
          Recipe App
        </h1>

        <div className="flex gap-3 mb-10 max-w-2xl mx-auto">
          <input
            type="text"
            className="flex-1 px-6 py-3 rounded-full border-2 border-emerald-100 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-lg"
            placeholder="What would you like to cook today?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="px-8 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {isLoading ? (
              <Loader/>
            ) : (
              "Discover"
            )}
          </button>
        </div>

        {error && (
          <div className="text-rose-500 text-center mb-6 bg-rose-50 py-3 rounded-lg">
            {error}
          </div>
        )}

        {recipes.length > 0 ? (
          <div className="grid gap-8">
            {recipes.map((item, index) => (
              <RecipeCard
                key={index}
                recipe={item.recipe}
                index={index}
                visibleRecipeIndex={visibleRecipeIndex}
                toggleRecipeVisibility={toggleRecipeVisibility}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 bg-white p-8 rounded-2xl shadow-md">
            Ready to explore new recipes? Type an ingredient or dish name above!
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipe;
