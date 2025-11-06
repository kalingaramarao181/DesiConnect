import React from "react";
import { FaShareAlt, FaHome } from "react-icons/fa";
import "./index.css";

const relatedCars = [
  {
    id: 1,
    name: "Honda Civic 2019",
    description: "Excellent condition, single owner.",
    price: "$8,500 USD",
    img: "/images/carads1.jpg",
  },
  {
    id: 2,
    name: "Toyota Corolla 2018",
    description: "Smooth drive, well maintained.",
    price: "$7,900 USD",
    img: "/images/carads2.jpg",
  },
  {
    id: 3,
    name: "BMW X1 2020",
    description: "Luxury and performance combined.",
    price: "$15,000 USD",
    img: "/images/carads3.jpg",
  },
  {
    id: 4,
    name: "Audi A4 2017",
    description: "Great family car with low mileage.",
    price: "$9,800 USD",
    img: "/images/carads4.jpg",
  },
  {
    id: 5,
    name: "Ford Mustang 2021",
    description: "Powerful engine and sporty design.",
    price: "$22,500 USD",
    img: "/images/carads5.jpg",
  },
  {
    id: 6,
    name: "Google Map Location",
    description: "Find the seller’s location easily.",
    price: "",
    img: "/images/carads6.jpg",
  },
];

const CarAdsPage = () => {
  return (
    <div className="carads-wrapper">
      {/* ===== MAIN SECTION 1 ===== */}
      <div className="carads-section carads-header-section">
        <div className="carads-header-left">
          <img
            src="/images/Web_Photo_Editor.jpg"
            alt="Car"
            className="carads-main-img"
          />
        </div>
        <div className="carads-header-right">
           <h1 className="usedcars-hero-price">$8,500 USD</h1>
           <p>Atlanta, GA . days ago</p>
        </div>
      </div>

      {/* ===== MAIN SECTION 2 ===== */}
      <div className="carads-section carads-condition-section">
        <div className="carads-condition-left">
          <h2 className="usedcars-condition-heading">Condition</h2>
          <p className="usedcars-condition-text">Car used 1 day ago</p>
        </div>
        <div className="carads-condition-right">
           <h3 className="usedcars-related-heading">Related Ads</h3>
        </div>
      </div>

      {/* ===== MAIN SECTION 3 ===== */}
      <div className="carads-section carads-details-section">
        {/* ==== LEFT SIDE ==== */}
        <div className="carads-details-left">
          <h2 className="carads-title">Car Description</h2>
          <p className="carads-description">
            This 2019 Honda Civic is a perfect family car offering reliability,
            fuel efficiency, and modern comfort. It has been well maintained
            with all service records available.
          </p>

          <div className="carads-seller-info">
            
            <div className="carads-seller-card">
              <img
                src="/images/caradscustomer1.jpg"
                alt="Seller"
                className="carads-seller-img"
              />
              <div className="carads-seller-details">
                <h4 className="usedcars-seller-name">John Doe</h4>
                <p className="usedcars-seller-contact">📞 +1 234 567 890</p>
                <p className="usedcars-seller-contact">✉️ john@example.com</p>
              </div>
            </div>
            <h3>Seller Details</h3>
            <div className="carads-header-icons">
        <FaHome className="carads-icon home" title="Home" />
        <FaShareAlt className="carads-icon share" title="Share" />
      </div>
            <div className="carads-seller-card">
              <img
                src="/images/caradscustomer2.jpg"
                alt="Seller"
                className="carads-seller-img"
              />
              <div className="carads-seller-details">
                <h4 className="usedcars-seller-name">Priya Patel</h4>
                <p className="usedcars-seller-contact">📞 +1 987 654 321</p>
                <p className="usedcars-seller-contact">✉️ priya@example.com</p>
              </div>
            </div>

            <button className="carads-contact-btn">Contact Seller</button>
          </div>
        </div>

        {/* ==== RIGHT SIDE (Related Cars Grid) ==== */}
        <div className="carads-details-right">
          <div className="carads-related-grid">
            {relatedCars.map((car) => (
              <div key={car.id} className="carads-related-card">
                <img
                  src={car.img}
                  alt={car.name}
                  className="carads-related-img"
                />
                <div className="carads-related-body">
                  <h4>{car.name}</h4>
                  <p>{car.description}</p>
                  {car.price && <span className="carads-related-price">{car.price}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarAdsPage;
