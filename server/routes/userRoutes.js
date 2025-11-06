const express = require('express');
// const { registerUser, loginUser, getUserProfile, updateUserRole, getUsersByRole } = require('../controllers/authController');
// const { protect, authorize } = require('../middlewares/authMiddleware');
// const { getUserById, getAllUsers, getUserDetails } = require('../controllers/userController');

const {getAllUsers, getUserById, getUsers} = require("../controllers/userControllers");
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// router.get('/user/:userId', getUserById);
router.get('/users', protect, getAllUsers);
router.get('/users/all', getUsers);
router.get(`/user/:userId`, getUserById)



module.exports = router;