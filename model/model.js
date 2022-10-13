const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var us_pd = new Schema({
    username: String,
    password: String
});

const user_pwd = mongoose.model('user_pwd', us_pd);

module.exports = user_pwd;