import React, {use, useState} from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
        const response = await axios.post(
            "http://localhost:4000/auth/login",
            formData,
            { withCredentials: true }
        );   
        console.log(response)
        setMessage(response.data.message); // Show success message
        setFormData({ username: "", password: "" }); // Clear form
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed"); // Show error message
    }
  };
  return (
    <div className="signup-container">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Name" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;