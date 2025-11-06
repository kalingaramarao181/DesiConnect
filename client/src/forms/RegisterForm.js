import React, { useState } from "react";
import "./styles/RegisterForm.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { sendOtp, verifyOtp, registerUser } from "../api/authApi";

const RegisterForm = ({ closePopup, setOpenForm }) => {
  const [formData, setFormData] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const validateEmail = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }
    return true;
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return false;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateEmail() || !validatePasswords()) return;
    if (isOtpSent) return setErrorMessage("OTP already sent. Please check your email.");

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const response = await sendOtp(payload);
      console.log("Send OTP response:", response.data);

      const token = response.data?.token;
      if (!token) throw new Error("OTP token not received from server.");

      Cookies.set("otpToken", token, { expires: 5 / (24 * 60) }); // expires in 5 mins
      setIsOtpSent(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage(error.response?.data?.message || error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!otp || otp.length !== 6) {
      return toast.error("Please enter the full 6-digit OTP.");
    }

    setLoading(true);
    try {
      const token = Cookies.get("otpToken");
      if (!token) throw new Error("OTP token expired. Please resend OTP.");

      const response = await verifyOtp(formData.email, otp, token);
      console.log("Verify OTP response:", response.data);

      const registerToken = response.data?.registerToken;
      if (!registerToken) throw new Error("Register token not received from server.");

      Cookies.set("registerToken", registerToken, { expires: 10 / (24 * 60) }); // 10 minutes

      await registerUser({
        ...formData,
        role: 3,
        token: registerToken,
      });

      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      if (error.response?.status === 401) {
        setErrorMessage("Invalid OTP. Please try again.");
        setIsOtpSent(false);
      } else {
        setErrorMessage(error.response?.data?.message || error.message || "Error verifying OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
    closePopup?.();
  };

  return (
    <>
      <h2 className="login-popup-title">Sign Up</h2>
      <form
        className="login-form"
        onSubmit={!isOtpSent ? handleSendOtp : handleVerifyOtp}
      >
        <label>
          Full Name <span className="cvb-edu-mandatory">*</span>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <label>
          Email <span className="cvb-edu-mandatory">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <label>
          Password <span className="cvb-edu-mandatory">*</span>
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={formData.password || ""}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <label>
          Confirm Password <span className="cvb-edu-mandatory">*</span>
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword || ""}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          required
        />

        {isOtpSent && (
          <div className="signup-otp-container">
            <input
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="cvb-login-input"
            />
          </div>
        )}

        <button type="submit" className="login-btn" disabled={loading}>
          {loading
            ? isOtpSent
              ? "Verifying..."
              : "Sending..."
            : isOtpSent
            ? "Verify OTP"
            : "Send OTP"}
        </button>

        {errorMessage && <p className="order-error-message">{errorMessage}</p>}
      </form>

      <p>
        Have an account?{" "}
        <button
          onClick={() => {
            closePopup(); // close current popup
            setTimeout(() => setOpenForm("signin"), 100); // open login form
          }}
          className="signup-button"
        >
          Login Here
        </button>
      </p>

      {showSuccessPopup && (
        <div className="success-popup">
          <div className="success-popup-header-container">
            <p>Registration successful!</p>
            <button onClick={handleSuccessPopupClose}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
