const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const url = require("url")

const {User} = require("./User.js")


const app = express()

const urlencoder = bodyparser.urlencoded({
    extended : false
})

app.use(cookieparser())
app.use(express.static(__dirname+"/public"))

app.use(session({
    resave: true,
    name:"webapdesecret",
    saveUninitialized: true,
    secret : "secretpass",
    cookie:{
        maxAge: 5*60*1000
    }
}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

app.post("/login", urlencoder, (req, res) => {
    let username = req.body.loginUN
    let password = req.body.loginPW
    
    res.sendFile(__dirname + "/public/calendar.html")
})

app.get("/logout", urlencoder, (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

app.listen(3069, () => {
    console.log("live at port 3069")
})