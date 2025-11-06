import React from "react";
import "./styles/Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-main">
      {/* 🔹 First Section */}
      <div className="footer-section footer-section-top">
        {/* Left Column (About, Contact, Terms) */}
        <div className="footer-column footer-info">
          <p className="footer-link">About</p>
          <p className="footer-link">Contact</p>
          <p className="footer-link">Terms</p>
        </div>

        {/* Right Column (Terms & Privacy) */}
        <div className="footer-column footer-legal">
          <p className="footer-link">Terms & Conditions</p>
          <p className="footer-link-second">Privacy Policy</p>
        </div>
      </div>

      {/* 🔹 Second Section (Number + Website Name) */}
      <div className="footer-section footer-section-middle">
        <p className="footer-text">📞 +1 (404) 123-4567</p>
        <p className="footer-texting">Terms & Conditions.com</p>
      </div>

      {/* 🔹 Third Section (View All + Social Media Icons) */}
      <div className="footer-section footer-section-bottom">
        <p className="footer-viewall">View All</p>
        <div className="footer-icons">
          <FaFacebookF className="footer-icon" />
          <FaTwitter className="footer-icon" />
          <FaInstagram className="footer-icon" />
          <FaLinkedinIn className="footer-icon" />
          <FaYoutube className="footer-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
