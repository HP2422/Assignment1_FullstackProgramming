const express = require("express");
const path = require("path");
const controller = require("./controllar/controller");
const route = express.Router();
const app = new express();

const ejs = require('ejs');
const mongoose = require('mongoose');
const user_pwd = require('./model/model');
const g2pageModel = require('./model/g2pagemodel');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded())

var router = express.Router();

// mongoose.connect('mongodb+srv://admin:admin@cluster0.2lz4hux.mongodb.net/?retryWrites=true&w=majority', {
//     useNewUrlParser: true
// })

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


const port = 4000;

connectDB();

user_pwd.create({
    username: 'admin',
    password: 'admin123'
}, (error, user_pwd) => {
    console.log(error, user_pwd);
})


app.get('/', (req, res, next) => {
    // res.sendFile(path.resolve(__dirname, "pages/dashboard.html"));
    res.render('dashboard');
})

app.get('/g', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/g.html"));
    // res.render('g');
    g2pageModel.find()
        .then(result => {
            res.status(200).json({
                data: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    // res.render('g');
})

app.get('/g2', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/g2.html"));
    res.render('g2');
})

app.post('/g2/addData', async (req, res) => {
    // console.log(req.body);
    // res.redirect('/g2');
    g2pageModel.create(req.body, (error, allData) => {
        res.redirect('/g2');
    })
})

app.get('/login', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/login.html"));
    res.render('login');
})

//For public folder access.
app.use(express.static("public"));

app.listen(port, () => {
    console.log("Server is listening on " + port);
})