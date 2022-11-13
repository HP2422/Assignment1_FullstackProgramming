const Data = require('../model/model');
module.exports = async (req, res) => {
    console.log("addData");
    console.log(req.body);

    Data.create({
        fName: req.body.fName,
        lName: req.body.lName,
        lNumber: req.body.lNumber,
        dob: new Date(req.body.dob),
        age: req.body.age,
        sin: req.body.sin,
        carDetails: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            plateNo: req.body.plateNo,
        }
    })
    res.redirect("/g2");
}