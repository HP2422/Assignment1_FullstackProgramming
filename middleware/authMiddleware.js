const { models } = require("mongoose");
const user = require("../model/user");

module.exports = (req, res, next) => {
    console.log("AuthMiddleware is called.");
    console.log("Check the Session Id" + req.session.userId);
    if (!req.session.userId)
        return res.redirect("/login");
    user.findById(req.session.userId, (error, user) => {
        if (error || !user)
            return res.redirect("/signup");
    })

    if (global.userType != 'driver') {
        console.log("AuthMiddleWare Checked, User is " + global.userType);
        return res.redirect("/");
    }
    next();
}