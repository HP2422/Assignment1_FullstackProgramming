const bcrypt = require("bcrypt");
const user = require("../model/user");

module.exports = (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    user.findOne({ username: username }, (error, user) => {
        console.log(user + " , " + error);
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    console.log("User Role = " + user.userType);
                    if (user.userType == "admin") {
                        global.isAdmin = true;
                    } else {
                        global.isAdmin = false;
                    }
                    res.redirect("/");
                } else {
                    global.isAdmin = false;
                    res.redirect("/login");
                }
            })
        } else {
            res.redirect("/signup");
        }
    })
}
