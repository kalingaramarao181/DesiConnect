const express = require("express");
const {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  sendResetOtp,
  resetPassword,
  verifyResetOtp,
} = require("../controllers/authControllers");
const { verifyJWT } = require("../middlewares/roleMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const axios = require("axios");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

router.get("/reverse-geocode", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat/lon" });
  }

  try {
    // const response = await fetch(
    //   `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
    //   {
    //     headers: { 
    //       "User-Agent": "OrderSwiftApp/1.0 (orderswift@example.com)"
    //     }
    //   }

    // );
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const response = await axios.get(url, {
      headers: { "User-Agent": "OrderSwift/1.0" },
    });

    // if (!response.ok) {
    //   return res.status(response.status).json({ error: "Upstream error" });
    // }

    const data = await response.data
    
    res.json(data);
  } catch (error) {
    console.error("Error in reverse geocode:", error);
    res.status(500).json({ error: "Failed to fetch location" });
  }
});

router.get("/resources", authMiddleware, (req, res) => {
  const role = req.user.role;

  const resources = {
    admin: [
      { id: 1, name: "Home" },
      { id: 2, name: "Category" },
      { id: 3, name: "Car Ads" },
      { id: 4, name: "Ad Details" }, // Only for logged in users
    ],
    user: [
      { id: 1, name: "Home" },
      { id: 2, name: "Category" },
      { id: 3, name: "Car Ads" },
      { id: 4, name: "Ad Details" }, // user can access details
    ],
    guest: [
      { id: 1, name: "Home" },
      { id: 2, name: "Category" },
      { id: 3, name: "Car Ads" },
      // No Ad Details for guest users
    ],
  };

  const data = resources[role] || resources.guest;
  return res.json(data);
});

module.exports = router;
