const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const url = require("url")
const MongoClient = require('mongodb').MongoClient

const User = require("./user.js").User
var Username
// const Event = require("./event.js").Event

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/sample_Db", {
    useNewUrlParser:true,
    useFindAndModify: false
}) 

const app = express()

const urlencoder = bodyparser.urlencoded({
    extended : false
})

app.use(cookieparser())
app.use(express.static(__dirname+"/views"))

app.use(session({
    resave: true,
    name:"webapdesecret", 
    saveUninitialized: true,
    secret : "secretpass",
    cookie:{
        maxAge: 5*60*1000
    } 
}))

app.get("/", (req, res)=>{
    
    console.log(User)
    // check first if there is a session
    // if yes, go to home page, greet user,
    //   else, go to login page
    
//    console.log(fontsize)
//    console.log(req.session.un)
    
    if(req.session.un){
        res.render("calendar.hbs", {
            username : req.session.un
        })        
    }else{
        console.log("Di Match")
        res.sendFile(__dirname + "/views/login.html")
    }

}) 


app.post("/login", urlencoder,(req,res)=>{
    // check if correct username
    
    var username = req.body.un
    var password = req.body.pw
    
    User.find({username:username, password:password}).then((doc)=>{
        console.log("user match")
        console.log(doc)
        
        req.session.un = username
        res.sendFile(__dirname + "/views/calendar.html")
        // res.render("calendar.hbs", {
        //     username
        // })
        console.log("User match in /login")
        Username = username
    }, (err)=>{
        alert("Not Valid!")
        console.log("Di match in /login")
        res.sendFile(__dirname + "/views/login.html")
        res.send(err)

    })
})
 app.post("/goregister", urlencoder,(req,res)=>{
     res.redirect("/register")
 })

app.post("/signup", urlencoder,(req,res)=>{
    // check if correct username

    var username = req.body.un
    var password = req.body.pw
    
    let user = new User({
        username : username,
        password: password,
        events: []
    })
    
    user.save().then((doc)=>{
        console.log(doc)
        req.session.username = doc.username
        res.redirect("/")
    }, (err)=>{
        res.send(err)
    })
    
    
})

app.get("/register", (req,res)=>{
    console.log("GET /register")
    let err = req.session.err
    let msg = req.session.msg
    console.log("err\t" + err)
    console.log("msg\t" + msg)
    req.session.err = null
    req.session.msg = null
    User.find({}, (err, docs)=>{
        if(err){
            res.render("calendar.hbs",{
                err
            })
           
        }else{
            // res.render("public/register.hbs", {
            //     users: docs,
            //     err ,
            //     msg 
            // })
            res.sendFile(__dirname + "/views/register.html")
        }
    })
})
/* BAKA PANG FIND TO NG EVENT
app.get("/addevent", (req,res)=>{
    console.log("GET /addevent")
    let err = req.session.err
    let msg = req.session.msg
    console.log("err\t" + err)
    console.log("msg\t" + msg)
    req.session.err = null
    req.session.msg = null
    Event.find({}, (err, docs)=>{
        if(err){
            res.render("calendar.hbs",{
                err
            })
           
        }else{
            res.render("calendar.hbs", {
                users: docs,
                err ,
                msg 
            })
        
        }
    })
})*/
/*
app.get("/edit", (req,res)=>{
    console.log("GET /getuser " + req.query.id)
    let id = req.query.id
    User.findOne({
        _id : id
    }, (err, doc)=>{
        if(err){
            res.render("admin.hbs",{
                err
            })
        }else{
            res.render("edit.hbs", {
                user: doc
            })
        }
    })
})
*/
app.post("/register", urlencoder, (req, res)=>{
    console.log("POST /registeruser " + req.body.un + " " + req.body.pw)
    let user = new User({
        username : req.body.un,
        password : req.body.pw,
        events: []
    })
    
    user.save().then((doc)=>{
        req.session.msg = "Successfully added " + doc.username
        console.log(doc)
        console.log(req.session.msg)
        res.redirect("/register")
    }, (err)=>{
        req.session.err = err
        res.redirect("/register")
    })
})

app.post("/addEvent", urlencoder, (req,res)=>{
    console.log("POST /addEvent " + req.body.title + " " + req.body.description)
    MongoClient.connect(url, function(err, db) {
        if (err) throw err

        if (!req.body.allDay) {
            var startD = req.body.start_date + "T" + req.body.start_time
            var endD = req.body.end_date + "T" + req.body.end_time
        }
        else {
            var startD = req.body.start_date
            var endD = req.body.end_date
        }
        
        var dbo = db.db("myCalendar")
        var new_event = { title: req.body.title, description: req.body.description, venue: req.body.venue, start: startD, end: endD}


        dbo.collection("users").update({username: Username}, {
            $set: {
                event: new_event
            }
        })
        // insertOne(new_event, function(err, res) {
        //   if (err) throw err;
        //   console.log("1 document inserted");
        //   db.close();
        // });
    }
    /*
    sample_Db.events.insertOne({
        name : req.body.name,
        startdate : req.body.startdate,
        enddate : req.body.enddate,
        allday : req.body.allday,
        starttime : req.body.starttime,
        endtime : req.body.endtime,
        description : req.body.description,
        venue : req.body.venue,
        priority : req.body.priority,
        type : req.body.type
    })*/
    /*let event = new Event({
        name : req.body.name,
        startdate : req.body.startdate,
        enddate : req.body.enddate,
        allday : req.body.allday,
        starttime : req.body.starttime,
        endtime : req.body.endtime,
        description : req.body.description,
        venue : req.body.venue,
        priority : req.body.priority,
        type : req.body.type
    })
    event.save().then((doc)=>{
        req.session.msg = "Successfully added event " + doc.name + " " + doc.startdate
        console.log(doc)
        console.log(req.session.msg)
        res.redirect("/")
    }, (err)=>{
        req.session.err = err
        res.redirect("/")
    })*/
)})

app.post("/editEvent", urlencoder, (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err

        if (!req.body.allDay) {
            var startD = req.body.start_date + "T" + req.body.start_time + ":00"
            var endD = req.body.end_date + "T" + req.body.end_time + ":00"
        }
        else {
            var startD = req.body.start_date
            var endD = req.body.end_date
        }
        
        var dbo = db.db("myCalendar")
        var new_event = { title: req.body.title, description: req.body.description, venue: req.body.venue, start: startD, end: endD}


        dbo.collection("users").update({venue: req.body.venue}, {
            $set: {
                event: {title: req.body.title, description: req.body.description, venue: req.body.venue, start: startD, end: endD}
            }
        })
        // insertOne(new_event, function(err, res) {
        //   if (err) throw err;
        //   console.log("1 document inserted");
        //   db.close();
        // });
    })
})
/*
app.post("/update", urlencoder, (req, res)=>{
    console.log("POST /update")
    let id = req.body.id
    let username = req.body.un
    let password = req.body.pw
    
    console.log(id + " " + username + " " + password)
    
    // update operators
    // https://docs.mongodb.com/manual/reference/operator/update/
    
    User.updateOne({
        _id : id
    }, {
        username,
        password   
    }, (err, doc)=>{
        if(err){
            res.render("admin.hbs", {
                err
            })
        }else{
            res.locals.msg = "Successfully updated " + JSON.stringify(doc)
            res.redirect("/admin")
        }
    })
})*/

/*
app.post("/delete", urlencoder, (req, res)=>{
    console.log("POST /delete")
    let id = req.body.id
    
    // update operators
    // https://docs.mongodb.com/manual/reference/operator/update/
    
    User.deleteOne({
        _id : id
    }, (err, doc)=>{
        if(err){
            res.render("admin.hbs", {
                err
            })
        }else{
            console.log(doc)
            res.send(doc)
        }
    })
})
*/
app.post("/validate", urlencoder, (req, res)=>{
    console.log("POST /validate \t" + req.body.id +  req.body.validated)
    
    let validated 
    if(req.body.validated == "true"){
        validated = false
    }else{
        validated = true
    }
    console.log(validated)
    
    User.findOneAndUpdate({
        _id: req.body.id
    },{
        $set:{
            validated 
        }
    }, {
        new: true
    }, (err, doc)=>{
        if(err){
            res.send(err)
            console.log("log sa validation err")
        }else{
            console.log("modified \t" + doc)
            console.log("can be basis")
            res.send(doc)
        }
    })
//    
//    User.updateOne({
//        _id: req.body.id
//    },{ 
//        $set: {
//            validated
//        }
//    },(err, doc)=>{
//        if(err){
//            res.send(err)
//        }else{
////            console.log(doc)
////            res.send("doc" + doc)
//            
//            User.findOne({
//                _id : req.body.id
//            }, (err, doc)=>{
//                console.log("doc " + doc)
//                res.send(doc)
//            })
//        }
//    })
})

app.get("/logout", (req,res)=>{
    req.session.destroy((err)=>{
        console.log("LOGGED OUT")
    })
    res.redirect("/")
})
/*
app.post("/preferences", urlencoder, (req, res)=>{
    var fontsize = req.body.fontsize
    res.cookie("fontsize",fontsize, {
        maxAge: 1000*60
    })
    console.log("pref" + fontsize)
//    res.sendFile(__dirname +"/public/preferences.html")
    res.redirect("/")
    
})

*/
app.listen(3002, ()=>{
    console.log("live at port 3002")
})

