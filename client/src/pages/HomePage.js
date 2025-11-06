import React, { useState } from "react";
import CategoryPage from "../components/Categories";
import "./styles/HomePage.css";
import FormView from "../forms/FormView";

const reviews = [
  {
    id: 1,
    name: "Amit Sharma",
    photo: "/images/review1.star.jpg",
    rating: 5,
    review:
      "Desi Connect made finding a roommate so easy! Highly recommend to everyone in Georgia’s Desi community.",
  },
  {
    id: 2,
    name: "Priya Patel",
    photo: "/images/review2.star.jpg",
    rating: 4,
    review:
      "Posted my ad in minutes! Got quick responses and closed my deal the same day. Excellent platform!",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    photo: "/images/review3.start.jpg",
    review:
      "The best Desi classifieds platform in Georgia — simple, fast, and trusted by the community.",
  },
];


const HomePage = () => {
  const [activeInput, setActiveInput] = useState("");
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="homepage-container">
      {/* 🔹 Hero Section */}
      <section className="hero-section1">
        {/* Left Text Section */}
        <div className="hero-text">
          <h1 className="hero-heading">
            Looking for fast responses? Post your ad today on{" "}
            <span className="highlight">Desi Connect</span> – Georgia’s Desi
          </h1>

          <p className="hero-subtext">
            <span className="orange-text">★</span> Desi Connect trusted
            classifieds since 2014!
          </p>

          {/* Search Box */}
          <div className="search-box">
            <input
              type="text"
              placeholder="Keyword"
              className={`input-box ${
                activeInput === "keyword" ? "active-input" : ""
              }`}
              onFocus={() => setActiveInput("keyword")}
              onBlur={() => setActiveInput("")}
            />
            <input
              type="text"
              placeholder="Category"
              className={`input-box ${
                activeInput === "category" ? "active-input" : ""
              }`}
              onFocus={() => setActiveInput("category")}
              onBlur={() => setActiveInput("")}
            />
            <input
              type="text"
              placeholder="Location"
              className={`input-box ${
                activeInput === "location" ? "active-input" : ""
              }`}
              onFocus={() => setActiveInput("location")}
              onBlur={() => setActiveInput("")}
            />
            <button className="search-btn">Search Ads</button>
          </div>
        </div>
      </section>
      <CategoryPage />
      {/* 🔹 Image Grid Section */}
      <section className="image-grid-section">
        <div className="image-grid">
          <img src="/images/homeimage1.jpg" alt="family1" />
          <img src="/images/homeimage2.jpg" alt="family2" />
          <img src="/images/homeimage3.jpg" alt="family3" />
        </div>
      </section>
      <section className="desi-hero-container">
        {/* Left Image Section */}
        <div className="desi-hero-image-section">
          <img
            src="/images/backgroundimage.png"
            alt="Desi Community"
            className="desi-hero-image"
          />
        </div>

        {/* Right Content Section */}
        <div className="desi-hero-content">
          <h1 className="desi-hero-title">
            Welcome to <span className="desi-highlight">Desi Connect</span>
          </h1>
          <p className="desi-hero-description">
            Your trusted community hub for Georgia’s Desi network — buy, sell,
            rent, or post ads with confidence. Connecting people since{" "}
            <b>2014</b>.
          </p>
          <button className="desi-hero-btn">Post Your Ad</button>
        </div>
      </section>
      <section className="desi-review-section">
        <h2 className="desi-review-title">
          What Our <span className="desi-highlight">Users Say</span>
        </h2>

        <div className="desi-review-container">
          {reviews.map((item) => (
            <div key={item.id} className="desi-review-card">
              <img
                src={item.photo}
                alt={item.name}
                className="desi-review-photo"
              />
              <p className="desi-review-text">“{item.review}”</p>

              {/* ⭐ Replace emojis with styled spans */}
              <div className="desi-review-stars">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <span key={index} className="desi-star">
                    ★
                  </span>
                ))}
              </div>

              <h4 className="desi-review-name">{item.name}</h4>
            </div>
          ))}
        </div>
      </section>
      <FormView openForm={openForm} setOpenForm={setOpenForm} />
    </div>
  );
};

export default HomePage;
