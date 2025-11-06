const express = require('express');
const { registerUser, loginUser, sendOtp, verifyOtp, sendResetOtp, resetPassword, verifyResetOtp } = require('../controllers/authControllers');
const { verifyJWT } = require('../middlewares/roleMiddleware');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/send-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);

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