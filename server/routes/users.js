const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const keys = require("../config/keys");
const User = require("../models/User");

// @route   GET api/users
// @desc    Get all physicians
// @access  Public
router.get("/", async (req, res) => {
    try {
        let physicians = await User.find().sort({ date: -1 });
        res.json(physicians);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/users
// @desc    Register route
// @access  Public
router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("username", "Username is required").not().isEmpty(),
        check("email", "Email is required").not().isEmpty(),
        check("email", "Email needs to be valid").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, username, password } = req.body;

        try {
            let user = await User.findOne({ username });

            if (user) {
                return res
                    .status(400)
                    .json({ error: [{ msg: "user already exists" }] });
            }

            user = new User({
                name,
                email,
                username,
                password,
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                keys.jwtSecret,
                { expiresIn: "36000" },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
