import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function RecipeDetails() {

  const { recipeId } = useParams();
  console.log(recipeId);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/${recipeId}`
        );
        setRecipe(response.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium text-red-500">
          Recipe not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Image */}
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-orange-500 mb-4">
            {recipe.name}
          </h1>

          {/* Cooking Time */}
          <p className="text-slate-600 mb-6">
            ⏱ Cooking Time: {recipe.cookingTime} minutes
          </p>

          {/* Description */}
          <p className="text-slate-700 mb-8 text-lg">
            {recipe.description}
          </p>

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              🥕 Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              👨‍🍳 Instructions
            </h2>
            <p className="text-slate-700 whitespace-pre-line">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
