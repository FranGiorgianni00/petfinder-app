 const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserInfo } = require('../controllers/userController');

router.post('/users/register', registerUser);
router.post('/users/login', loginUser);
router.get('/users/me', getUserInfo);

module.exports = router;
