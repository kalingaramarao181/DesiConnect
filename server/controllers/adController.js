const AdModel = require("../models/adModel");
const axios = require("axios");

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


const adController = {
  // ✅ Create Ad
  createAd: async (req, res) => {
    try {
      const adData = req.body;
      
      if (typeof adData.json_data === "string") {
        try {
          adData.json_data = JSON.parse(adData.json_data);
        } catch (err) {
          console.warn("Invalid JSON in json_data:", err);  
        }
      }

    const lat = adData.latitude ? parseFloat(adData.latitude) : null;
    const lng = adData.longitude ? parseFloat(adData.longitude) : null;
    const address = adData.location || null;

    adData.location = JSON.stringify({
      lat,
      lng,
      address,
    });

    delete adData.latitude;
    delete adData.longitude;

      const folder = (req.body.folder || "icons").replace(/["']/g, "").trim();

      const files = req.files || [];

      const imageUrls = files.map(
        (file) => `/uploads/${folder}/${file.filename}`
      );

      const ad_id = await AdModel.createAd(adData, imageUrls);

      res.status(201).json({
        success: true,
        message: "Ad created successfully",
        ad_id,
        images: imageUrls,
      });
    } catch (error) {
      console.error("❌ Error creating ad:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  },

  // ✅ Update Ad
  updateAd: async (req, res) => {
    try {
      const { id } = req.params;
      const adData = req.body;

      if (typeof adData.json_data === "string") {
        adData.json_data = JSON.parse(adData.json_data);
      }

      const files = [...(req.files?.images || []), ...(req.files?.image || [])];

      const imageUrls = files.map(
        (file) => `/uploads/${req.body.folder || "icons"}/${file.filename}`
      );

      const affected = await AdModel.updateAd(id, adData, imageUrls);

      if (!affected)
        return res
          .status(404)
          .json({ success: false, message: "Ad not found" });

      res.status(200).json({
        success: true,
        message: "Ad updated successfully",
        images: imageUrls,
      });
    } catch (error) {
      console.error("Error updating ad:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // ✅ Delete Ad
  deleteAd: async (req, res) => {
    try {
      const { id } = req.params;
      const affected = await AdModel.deleteAd(id);

      if (!affected)
        return res
          .status(404)
          .json({ success: false, message: "Ad not found" });

      res
        .status(200)
        .json({ success: true, message: "Ad deleted successfully" });
    } catch (error) {
      console.error("Error deleting ad:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // ✅ Get All Ads with Filters
   getAllAds: async (req, res) => {
    
    try {
      const ads = await AdModel.getAllAds(req.query);
      res.status(200).json({ success: true, count: ads.length, data: ads });
    } catch (error) {
      console.error("Error fetching ads:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // ✅ Get Ads by Category
  getAdsByCategory: async (req, res) => {
    try {
      const { category_id } = req.params;
      const ads = await AdModel.getAdsByCategory(category_id, req.query);

      res.status(200).json({
        success: true,
        count: ads.length,
        data: ads,
      });
    } catch (error) {
      console.error("Error fetching category ads:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  getAdDetailsById: async (req, res) => {
    try {
      const { adId } = req.params;
      
      const ad = await AdModel.getAdDetailsById(adId);    
      if (!ad) {
        return res.status(404).json({
          success: false,
          message: "Ad not found",
        });
      }
      res.status(200).json({
        success: true,
        data: ad,
      });
    } catch (error) {
      console.error("Error fetching ad details:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // ✅ Get Ads by User
  getAdsByUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      const ads = await AdModel.getAdsByUser(user_id, req.query);

      res.status(200).json({
        success: true,
        count: ads.length,
        data: ads,
      });
    } catch (error) {
      console.error("Error fetching user ads:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

 getUniqueLocations: async (req, res) => {
    try {
      const db = require("../config/db");
      const [rows] = await db.query(
        "SELECT location FROM ads WHERE location IS NOT NULL AND location != ''"
      );

      const cities = new Set();

      console.log(`🗺 Found ${rows.length} locations to process`);

      for (const [index, row] of rows.entries()) {
        try {
          const loc = JSON.parse(row.location);
          if (!loc.lat || !loc.lng) continue;

          console.log(`🌍 [${index + 1}/${rows.length}] Checking ${loc.lat}, ${loc.lng}`);

          const url = `https://nominatim.openstreetmap.org/reverse?lat=${loc.lat}&lon=${loc.lng}&format=json`;
          const resGeo = await axios.get(url, {
            headers: { "User-Agent": "OrderSwift/1.0" },
          });

          const address = resGeo.data.address;

          const city =
            address.city ||
            address.town ||
            address.county ||
            address.state_district ||
            address.suburb ||
            address.state;

          if (city) {
            cities.add(city);
            console.log(`✅ Found city: ${city}`);
          } else {
            console.warn(`⚠️ No city found for ${loc.lat}, ${loc.lng}`);
          }

          // 🕐 Wait 1 second before next API call
          await delay(1000);
        } catch (err) {
          console.warn("Skipping invalid location:", err.message);
        }
      }

      // Send final response once after all loops finish
      res.json({
        success: true,
        count: cities.size,
        cities: [...cities],
      });
    } catch (error) {
      console.error("❌ Error fetching unique locations:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  },

};

module.exports = adController;
