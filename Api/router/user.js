const express = require("express");
const router = express.Router();

const UserController = require('../Controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/register", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;