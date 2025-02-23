import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        fullName: "",
        email: "",
        avatar: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === "avatar") {
            setFormData({ ...formData, avatar: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("username", formData.username);
        data.append("password", formData.password);
        data.append("fullName", formData.fullName);
        data.append("email", formData.email);
        if (formData.avatar) {
            data.append("avatar", formData.avatar);
        }

        try {
            const response = await API.post("/register", data);
            if (response.data.success) {
                alert("Signup successful!");
                navigate("/login");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="file" name="avatar" accept="image/*" onChange={handleChange} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
