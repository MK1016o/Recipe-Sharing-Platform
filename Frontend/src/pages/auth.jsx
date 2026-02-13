import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-6">
          🍳 RecipeShare
        </h1>

        <h2 className="text-2xl font-semibold text-center text-slate-800 mb-6">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <AuthForm isLogin={isLogin} />

        <p className="text-center text-sm text-slate-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 font-medium hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

const AuthForm = ({ isLogin }) => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isLogin) {
        const result = await axios.post(
          "http://localhost:3000/auth/login",
          { username, password }
        );

        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userID);
        navigate("/");
      } else {
        await axios.post(
          "http://localhost:3000/auth/register",
          { username, password }
        );
        alert("Registration successful! Please login.");
      }
    } catch (error) {
      alert("Authentication failed. Please check your credentials and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded-lg font-medium text-white transition ${
          isLogin
            ? "bg-orange-500 hover:bg-orange-600"
            : "bg-emerald-500 hover:bg-emerald-600"
        }`}
      >
        {isLogin ? "Login" : "Create Account"}
      </button>
    </form>
  );
};
