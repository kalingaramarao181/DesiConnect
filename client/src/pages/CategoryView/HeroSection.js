import React from "react";
// import "./HeroSection.css";

const HeroSection = ({ categoryName }) => {
  // Dynamic title and subtitle per category
  const categoryData = {
    cars: {
      title: "Used Cars in Georgia",
      subtitle: "Browse affordable vehicles from the community",
    },
    electronics: {
      title: "Electronics for Sale",
      subtitle: "Find top deals on gadgets and devices around you",
    },
    travel: {
      title: "Travel Companions",
      subtitle: "Meet people to share your travel journey with",
    },
    carpool: {
      title: "Carpool Services",
      subtitle: "Share your ride and save more on your daily commute",
    },
    movingsale: {
      title: "Moving Sale",
      subtitle: "Grab great deals before someone moves out!",
    },
    rooms: {
      title: "Rooms & Rentals",
      subtitle: "Find the perfect place to stay at your convenience",
    },
    jobs: {
      title: "Job Listings",
      subtitle: "Discover exciting opportunities near you",
    },
  };

  const { title, subtitle } = categoryData[categoryName?.toLowerCase()] || {
    title: "Browse Listings",
    subtitle: "Find great deals and opportunities from your community",
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <div className="hero-breadcrumb">
            Home › {categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : "Category"}
          </div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
