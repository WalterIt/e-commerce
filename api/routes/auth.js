const { login, register } = require("../controllers/auth.js");

const router = require("express").Router();

// REGISTER  USER
router.post("/register", register);
router.post("/login", login);

module.exports = router;
