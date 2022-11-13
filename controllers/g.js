const Data = require('../model/model');
module.exports = async (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/g.html"));
    var data = null;
    res.render('g', { data });
};