const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const allData = new Schema({
    fName: String,
    lName: String,
    age: Number,
    sin: { type: String },
    lNumber: { type: String, required: true, unique: true },
    dob: { type: Date, default: new Date() },
    carDetails: {
        make: String,
        model: String,
        year: Number,
        plateNo: String
    }
});

allData.pre("save", function (next) {
    const user = this;
    bcrypt.hash(user.lNumber, 10, (error, hash) => {
        user.lNumber = hash;
        next();
    })
})

const data = mongoose.model("data", allData);
module.exports = data;