const Data = require('../model/model');
module.exports = async (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/g2.html"));
    console.log("G2 is Called.");
    var data = null;
    res.render('g2');
};