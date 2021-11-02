const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const auth = require("../middleware/auth");

// @route   GET api/appointments
// @desc    Get all appointments for today
// @access  Public
router.get("/", async (req, res) => {
    try {
        let queryObj = {};
        const startOfDay = new Date();
        const endOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        endOfDay.setHours(23, 59, 59, 999);
        queryObj.appointmentTime = { $gte: startOfDay, $lt: endOfDay };
        const appointments = await Appointment.find(queryObj).sort({
            date: -1,
        });
        res.json(appointments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/characters
// @desc    Create character route
// @access  Private
router.post(
    "/",
    auth,
    [
        check("name", "Appointment holder name is required").not().isEmpty(),
        check("physicianEmail", "Phsyician email is required").not().isEmpty(),
        check("physicianEmail", "Physician email must be valid").isEmail(),
        check("kind", "kind of appointment is required").not().isEmpty(),
        check("appointmentTime", "appointment time is required")
            .not()
            .isEmpty(),
        check(
            "appointmentTime",
            "appointment time must be a valid date and time"
        ).isISO8601(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, kind, physicianEmail, appointmentTime } = req.body;

            const user = await User.findById(req.user.id).select("-password");
            const physician = await User.findOne({
                email: physicianEmail,
            }).select("-password");

            if (!physician) {
                return res.status(400).json({
                    error: [
                        { msg: "physician with that email does not exist" },
                    ],
                });
            }

            const newAppointment = new Appointment({
                createdByUser: user.id,
                physician: physician.id,
                name,
                kind,
                appointmentTime,
            });

            const appointment = await newAppointment.save();

            res.json(appointment);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
