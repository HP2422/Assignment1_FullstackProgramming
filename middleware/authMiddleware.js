const { models } = require("mongoose");
const user = require("../model/user");

module.exports = (req, res, next) => {
    console.log("AuthMiddleWare Chacked - " + req.session.userId);
    if (!req.session.userId)
        return res.redirect("/login");
    user.findById(req.session.userId, (error, user) => {
        if (error || !user)
            return res.redirect("/signup");
    })

    if (global.userType != 'driver') {
        console.log("AuthMiddleWare Chacked, User is not a driver, = " + global.userType);
        return res.redirect("/");
    }

    next();
}