import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const navigate = useNavigate();
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3000/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      alert("Failed to save recipe. Please login and try again.");
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
        🍽 Discover Recipes
      </h1>

      <ul className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {recipes.map((recipe) => (
          <li
            key={recipe._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-52 object-cover"
              />
              <span className="absolute top-3 right-3 bg-white/90 text-sm px-3 py-1 rounded-full font-medium">
                ⏱ {recipe.cookingTime} min
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                {recipe.name}
              </h2>

              <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                {recipe.instructions}
              </p>

              <div className="flex gap-3">
                {/* View Recipe Button */}
                <button
                  onClick={() => navigate(`/recipes/${recipe._id}`)}
                  className="w-1/2 py-2.5 rounded-lg font-medium bg-slate-800 text-white hover:bg-slate-900 transition"
                >
                  View
                </button>

                {/* Save Button */}
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                  className={`w-1/2 py-2.5 rounded-lg font-medium transition
      ${isRecipeSaved(recipe._id)
                      ? "bg-emerald-500 text-white cursor-default"
                      : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                >
                  {isRecipeSaved(recipe._id) ? "✓ Saved" : "Save"}
                </button>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
