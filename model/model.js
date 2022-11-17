const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const allData = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String },
    userType: { type: String, default: 'driver' },
    fName: { type: String, default: 'default' },
    lName: { type: String, default: 'default' },
    age: { type: Number, default: 20 },
    sin: { type: String, default: 'default' },
    lNumber: { type: String, unique: true },
    dob: { type: Date, default: new Date() },
    carDetails: {
        make: { type: String, default: 'default' },
        model: { type: String, default: 'default' },
        year: { type: String, default: 'default' },
        plateNo: { type: String, default: 'default' }
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