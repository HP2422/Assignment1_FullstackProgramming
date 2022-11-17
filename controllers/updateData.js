const Data = require('../model/model');
module.exports = async (req, res) => {
    console.log("updateData is Called -> " + req.body.id);
    console.log("body -> " + req.body);

    const obj = {
        carDetails: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            plateNo: req.body.plateNo,
        },
    };
    const output = await Data.findByIdAndUpdate(req.body.id, obj, function (error, object) {
        console.log("error -> " + error + " , Obj -> " + obj);
    }).clone();
    res.redirect('/g');
}