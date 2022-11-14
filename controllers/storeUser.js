const user = require('../model/user');
module.exports = async (req, res) => {
    console.log(req.body);
    try {
        if (req.body.password != req.body.r_password) {
            global.eMsg = "Password is mismached !!!";
        } else {
            await user.create({
                username: req.body.username,
                password: req.body.password,
                userType: req.body.userType
            });
            global.eMsg = null;
        }
    } catch (error) {
        console.log("error " + error);
        if (error.message.includes("E11000 duplicate key error")) {
            global.eMsg = "Username is already taken. Please try with a different username";
        } else {
            global.eMsg = null;
        }
    }
    res.redirect(global.eMsg != null ? "/signup" : "/");
}