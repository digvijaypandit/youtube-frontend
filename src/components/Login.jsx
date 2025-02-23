import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/login", formData);

            if (response.data.success) {
                alert("Login successful!");
                localStorage.setItem("accessToken", response.data.data.accessToken);
                navigate("/dashboard");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
