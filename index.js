const express = require("express");
const app = new express();

const path = require("path");
const route = express.Router();
const ejs = require('ejs');
const mongoose = require('mongoose');
const Data = require('./model/model');
const user = require('./model/user');

const home = require("./controllers/dashboard");
const g = require("./controllers/g");
const g2 = require("./controllers/g2");
const login = require("./controllers/login");
const addData = require("./controllers/addData");
const getData = require("./controllers/getData");
const updateData = require("./controllers/updateData");

const signup = require("./controllers/signup");
const storeUser = require("./controllers/storeUser");

const userLogin = require("./controllers/userLogin");

app.set('view engine', 'ejs');

global.eMsg = null;

app.use(express.json())
app.use(express.urlencoded())

var router = express.Router();

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


app.get("/", home);

app.get('/g', g);

app.get('/g2', g2);

app.get("/login", login);
app.post("/users/login", userLogin);
app.get("/signup", signup);
app.post("/storeUser", storeUser);



// Add the data Function.
app.post("/g2/addData", addData);

// Fetch the data function.
app.post("/getData", getData);

// Update the Data.
app.post("/updateData", updateData);

//For public folder access.
app.use(express.static("public"));


app.listen(port, () => {
    console.log("Server is listening on " + port);
})

// Assignment 2 Insuructions Completed.
// ADD, FETCH and UPDATE DATA is running smoothly.