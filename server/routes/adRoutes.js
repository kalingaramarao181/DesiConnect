// routes/adRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createAd,
  updateAd,
  deleteAd,
  getAllAds,
  getAdsByCategory,
  getAdsByUser,
  getAdDetailsById,
  getUniqueLocations,
} = require("../controllers/adController");

// Routes
router.post("/", upload, createAd);
router.put("/:id", upload, updateAd);
router.delete("/:id", deleteAd);
router.get("/all/filters", getAllAds);
router.get("/category/:category_id", getAdsByCategory);
router.get("/adDetails/:adId", getAdDetailsById);
router.get("/users/:user_id", getAdsByUser);
router.get("/locations", getUniqueLocations);

module.exports = router;