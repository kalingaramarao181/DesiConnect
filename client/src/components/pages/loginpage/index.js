import React, { useState } from "react";
import "./index.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "demo@desiconnect.com" && password === "123456") {
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Desi Connect</h2>
        <p className="login-subtitle">Welcome back! Please login to continue.</p>
        <form onSubmit={handleSubmit} className="login-form">

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-group">
              {/* <FaUser className="input-icon" /> */}
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              {/* <FaLock className="input-icon" /> */}
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don’t have an account?{" "}
          <span className="register-link" onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
