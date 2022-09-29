const express = require("express");
const path = require("path");
const app = new express();

const ejs = require('ejs');
app.set('view engine', 'ejs');

const port = 4000;

app.get('/', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/dashboard.html"));
    res.render('dashboard');
})

app.get('/g', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/g.html"));
    res.render('g');
})

app.get('/g2', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "pages/g2.html"));
    res.render('g2');
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