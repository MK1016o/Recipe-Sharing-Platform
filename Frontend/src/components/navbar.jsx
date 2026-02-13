import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/auth");
  };

  return (
    <nav className="bg-white p-2 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo / Brand */}
        <Link to="/" className="text-3xl font-bold text-orange-500">
          🍳 RecipeShare
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-slate-700 font-medium text-lg">
          <Link
            to="/"
            className="hover:text-orange-500 transition"
          >
            Home
          </Link>

          <Link
            to="/create-recipe"
            className="hover:text-orange-500 transition"
          >
            Create Recipe
          </Link>

          {cookies.access_token ? (
            <Link
            to="/saved-recipes"
            className="hover:text-orange-500 transition"
          >
            Saved Recipes
          </Link>
          ) : (
            <div></div>
          )}
        </div>

        {/* Auth Button */}
        <div>
          {!cookies.access_token ? (
            <Link
              to="/auth"
              className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition font-medium"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
