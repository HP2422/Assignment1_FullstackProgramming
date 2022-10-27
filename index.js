const express = require("express");
const path = require("path");
const route = express.Router();

const ejs = require('ejs');
const mongoose = require('mongoose');
const Data = require('./model/model');

const app = new express();
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded())

var router = express.Router();

// mongoose.connect('mongodb+srv://admin:admin@cluster0.2lz4hux.mongodb.net/?retryWrites=true&w=majority', {
//     useNewUrlParser: true
// })

const port = 4000;

const connectDB = async () => {
    try {
        const con = await mongoose.connect("mongodb+srv://admin:admin@cluster0.2lz4hux.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true
        })
        console.log(`MongoDb Database is Connected ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

connectDB();

// user_pwd.create({
//     username: 'admin',
//     password: 'admin123'
// }, (error, user_pwd) => {
//     console.log(error, user_pwd);
// })


app.get('/', (req, res, next) => {
    // res.sendFile(path.resolve(__dirname, "pages/dashboard.html"));
    res.render('dashboard');
})

app.get('/g', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/g.html"));
    var data = null;
    res.render('g', { data });
})

app.get('/g2', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/g2.html"));
    res.render('g2');
})

// app.post('/g2/addData', async (req, res) => {
//     // console.log(req.body);
//     // res.redirect('/g2');
//     // g2pageModel.create(req.body, (error, allData) => {
//     //     res.redirect('/g2');
//     // })
// })

app.get('/login', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/login.html"));
    res.render('login');
})


// Add the data Function.
app.post("/g2/addData", async (req, res) => {
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
})

// Fetch the data function.
app.post("/getData", async (req, res) => {
    console.log("getData");
    console.log(req.body.lNumber);
    let data = "";
    try {
        data = await Data.find({
            lNumber: req.body.lNumber,
        }).lean();
        if (data[0] != null) {
            data.dob = data[0].dob.getMonth() + "-" + data[0].dob.getDate() + "-" + data[0].dob.getFullYear();
        } else {
            data = { message: "No user found" }
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    res.render("g", { data });
});

// Update the Data.
app.post("/g2/updateDetails", async (req, res) => {
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

    console.log('Update success 1' + output)
    res.redirect('/g');
})


//For public folder access.
app.use(express.static("public"));

app.listen(port, () => {
    console.log("Server is listening on " + port);
})

// Assignment 2 Insuructions Completed.
// ADD, FETCH and UPDATE DATA is running smoothly.