import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../feature/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const BASE_URL = "http://localhost:8000/api/v1/users"; // API Base URL

function Login() {
  const [input, setInput] = useState(""); // Accepts username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Determine if the input is an email or username
    const requestBody = input.includes("@")
      ? { email: input, password }  // Send as email
      : { username: input, password }; // Send as username

    try {
      const { data } = await axios.post(`${BASE_URL}/login`, requestBody, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        dispatch(
          login({
            user: data.data.user,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          })
        );
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white text-center">Sign in</h1>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-300">
              Username or Email
            </label>
            <input
              type="text"
              id="input"
              className="w-full p-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username or email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
          >
            Sign in
          </button>

          <p className="text-sm text-gray-400 text-center">
            Don’t have an account yet?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-medium text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
