import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const ingredients = [...recipe.ingredients];
    ingredients[index] = event.target.value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/recipes",
        recipe,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Recipe created successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to create recipe. Please try login and try again.");
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-100 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-orange-500 mb-8">
        🍳 Create a New Recipe
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-3xl mx-auto p-8 rounded-3xl shadow-xl space-y-6"
      >
        {/* Recipe Name */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Recipe Name
          </label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Short Description
          </label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">
            Ingredients
          </label>

          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
              className="w-full mb-3 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder={`Ingredient ${index + 1}`}
              required
            />
          ))}

          <button
            type="button"
            onClick={handleAddIngredient}
            className="text-orange-500 font-medium hover:underline"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Cooking Instructions
          </label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        {/* Cooking Time */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            required
          />
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-600 transition shadow-md"
          >
            Publish Recipe
          </button>
        </div>
      </form>
    </div>
  );
};
