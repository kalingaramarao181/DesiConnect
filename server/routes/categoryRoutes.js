const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const {
  getFieldsByCategory,
  addField,
  updateField,
  deleteField,
  getFiltersByCategory,
} = require("../controllers/categoryFieldController");


// CRUD Routes
router.get("/", fetchCategories);
router.post("/", upload, addCategory);
router.put("/:id", upload, updateCategory);
router.delete("/:id", deleteCategory);


router.get("/:category_id/fields", getFieldsByCategory);
router.post("/:category_id/fields", addField);
router.put("/fields/:field_id", updateField);
router.delete("/fields/:field_id", deleteField);


router.get("/filters/:category_id", getFiltersByCategory);


module.exports = router;
