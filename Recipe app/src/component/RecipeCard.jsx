import React from 'react';

const RecipeCard = ({ recipe, index, visibleRecipeIndex, toggleRecipeVisibility }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-emerald-50">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-900">
            {recipe.label}
          </h2>
          <button
            onClick={() => toggleRecipeVisibility(index)}
            className="px-6 py-2 text-emerald-600 border-2 border-emerald-200 rounded-full hover:bg-emerald-50 transition-colors duration-300 font-medium"
          >
            {visibleRecipeIndex === index ? "Hide Recipe" : "Show Recipe"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="bg-emerald-50 p-3 rounded-lg">
            <span className="font-semibold">Calories:</span> 
            {Math.round(recipe.calories)}
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg">
            <span className="font-semibold">Servings:</span> 
            {recipe.yield}
          </div>
          {recipe.cuisineType && (
            <div className="bg-emerald-50 p-3 rounded-lg">
              <span className="font-semibold">Cuisine:</span> 
              {recipe.cuisineType[0]}
            </div>
          )}
          {recipe.mealType && (
            <div className="bg-emerald-50 p-3 rounded-lg">
              <span className="font-semibold">Meal Type:</span> 
              {recipe.mealType[0]}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {recipe.dietLabels.map((label, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {label}
            </span>
          ))}
          {recipe.healthLabels.map((label, i) => (
            <span key={i} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              {label}
            </span>
          ))}
        </div>

        <div className={`transition-all duration-500 ease-in-out ${visibleRecipeIndex === index ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0'} overflow-hidden`}>
          <div className="space-y-6">
            <div className="flex justify-center">
              <img
                src={recipe.image}
                alt={recipe.label}
                className="rounded-xl shadow-md max-w-full h-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold text-emerald-800 mb-4">
                Ingredients
              </h3>
              <ul className="grid gap-3">
                {recipe.ingredients.map((ingredient, i) => (
                  <li 
                    key={i}
                    className="text-gray-700 flex items-center bg-emerald-50 p-3 rounded-lg"
                  >
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                    {ingredient.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 text-center">
              <a 
                href={recipe.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors duration-200"
              >
                View Full Recipe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
