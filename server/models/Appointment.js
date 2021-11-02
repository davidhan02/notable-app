const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new mongoose.Schema({
    physician: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    createdByUser: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    name: {
        type: String,
        required: true,
    },
    kind: {
        type: String,
        required: true,
    },
    appointmentTime: {
        type: Date,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("appointment", AppointmentSchema);
