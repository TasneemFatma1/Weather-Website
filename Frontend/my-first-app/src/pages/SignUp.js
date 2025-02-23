import React, { useState } from "react";
import axios from "axios"; // For API requests
import "./SignUp.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.post("http://localhost:4000/auth/signup", formData);
      console.log(response)
      setMessage(response.data.message); // Show success message
      setFormData({ username: "", password: "" }); // Clear form
    } catch (error) {
      setMessage(error.response?.data?.error || "Signup failed"); // Show error message
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Name" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
        <p>Already a user?<a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;
