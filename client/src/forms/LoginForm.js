import React, { useState } from "react";
import "./styles/LoginForm.css";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ closePopup, role, setOpenForm, onLoginSuccess  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser({ email, password }, navigate);
      if (response?.token && response?.user) {
        onLoginSuccess(response.user); // pass logged-in user data
      }
      closePopup();
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="login-popup-title">Welcome to User</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email <span className="tfm-edu-mandatory">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>
          Password <span className="tfm-edu-mandatory">*</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        <button
          onClick={() => {
            closePopup(); // close current popup
            setTimeout(() => setOpenForm("password"), 100); // open password form
          }}
          className="signup-button"
        >
          Forgot Password
        </button>
        / Don't have an account?{" "}
        <button
          onClick={() => {
            closePopup();
            setTimeout(() => setOpenForm("register"), 100); // open register form
          }}
          className="signup-button"
        >
          Sign Up
        </button>
      </p>

      {errorMessage && <p className="login-error-message">{errorMessage}</p>}
    </>
  );
};

export default LoginForm;
