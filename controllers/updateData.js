const Data = require('../model/model');
module.exports = async (req, res) => {
    console.log("updateDetails Called -> " + req.body.id);
    console.log("body -> " + req.body);

    const obj = {
        carDetails: {
            make: req.body.make,
            model: req.body.model,
            year: req.body.year,
            plateNo: req.body.plateNo,
        },
    };
    console.log("make -> " + obj);


    const output = await Data.findByIdAndUpdate(req.body.id, obj, function (error, object) {
        console.log("error -> " + error + " , Obj -> " + obj);
    }).clone();

    console.log('Update success 1' + output);
    res.redirect('/g');
}