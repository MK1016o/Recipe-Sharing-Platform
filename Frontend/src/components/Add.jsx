import React, { useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  };

  return (
    <>
    <NavBar></NavBar>
    <div className="container">
    <div className="col-6 offset-3">
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="mb-3">
        <label for="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
           className="form-control"
          value={recipe.name}
          onChange={handleChange}
        /> 
        </div>
        <label for="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          value={recipe.description}
          className="form-control"
          onChange={handleChange}
        ></textarea>
        <label for="ingredients" className="form-label">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            className="form-control mb-1"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={handleAddIngredient} className="rounded bg-light btns">
         + Add Ingredient
        </button>
        <label for="instructions" className="form-label">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          className="form-control"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <label for="imageUrl" className="form-label">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          className="form-control"
          value={recipe.imageUrl}
          onChange={handleChange}
        />
        <label for="cookingTime" className="form-label">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          className="form-control"
          name="cookingTime"
          value={recipe.cookingTime}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-dark add-btn mt-3">Create Recipe</button>
      </form>
    </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default CreateRecipe;