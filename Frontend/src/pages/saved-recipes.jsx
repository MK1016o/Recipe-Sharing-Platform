import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();

  const removeRecipe = async (recipeID) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/recipes/removeSaved",
      {
        recipeID,
        userID,
      }
    );

    setSavedRecipes((prev) =>
      prev.filter((recipe) => recipe._id !== recipeID)
    );
  } catch (err) {
    console.log(err);
  }
};


  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
        📌 Saved Recipes
      </h1>

      {savedRecipes.length === 0 ? (
        <p className="text-center text-slate-500">
          You haven’t saved any recipes yet.
        </p>
      ) : (
        <ul className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
  {savedRecipes.map((recipe) => (
    <li
      key={recipe._id}
      className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-52 object-cover"
        />
        <span className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-medium shadow">
          ⏱ {recipe.cookingTime} min
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between h-[180px]">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">
            {recipe.name}
          </h2>

          <p className="text-slate-600 text-sm line-clamp-2 mb-4">
            {recipe.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/recipes/${recipe._id}`)}
            className="w-1/2 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-900 transition"
          >
            View
          </button>

          <button
            onClick={() => removeRecipe(recipe._id)}
            className="w-1/2 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  ))}
</ul>

      )}
    </div>
  );
};
