const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var data = new Schema({
    fName: String,
    lName: String,
    lNumber: String,
    age: Number,
    make: String,
    model: String,
    year: Number,
    pNumber: String
}
);

const allData = mongoose.model('allData', data);

module.exports = allData;