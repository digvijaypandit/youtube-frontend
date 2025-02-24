import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../feature/authSlice";
import { useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!avatar) {
      setError("Avatar image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      const response = await fetch("http://localhost:8000/api/v1/users/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // Auto-login after registration
        dispatch(
          login({
            user: data.data.user,
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
          })
        );

        // Redirect to home page
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-white text-center">Sign up</h1>

        {/* Error Message */}
        {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full p-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full p-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-300">
              Avatar (Required)
            </label>
            <input
              type="file"
              id="avatar"
              className="w-full p-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setAvatar)}
              required
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-300">
              Cover Image (Optional)
            </label>
            <input
              type="file"
              id="coverImage"
              className="w-full p-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white"
              accept="image/*"
              onChange={(e) => handleImageChange(e, setCoverImage)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2.5 rounded-lg font-medium text-sm hover:bg-blue-700"
          >
            Sign up
          </button>

          <p className="text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-blue-500 hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;
