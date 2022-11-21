const Data = require("../model/model");
module.exports = async (req, res) => {
  console.log(req.body._id);
  console.log({ req });

  const obj = {
    ...req.body,
    carDetails: {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      plateNo: req.body.plateNo,
    },
  };
  const output = await Data.findByIdAndUpdate(
    req.session.userId,
    obj,
    function (error, object) {
      console.log("error -> " + error + " , Obj -> " + { obj });
    }
  ).clone();
  res.redirect("/g");
};
