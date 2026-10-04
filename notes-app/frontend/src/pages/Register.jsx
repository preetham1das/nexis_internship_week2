import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}
        <label htmlFor="name">Full Name</label>
        <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" minLength={8} value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
}

export default Register;