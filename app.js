//requring the packages that we just installed
const express = require("express");
const bodyParser = require("body-parser");

//requiring the date.js file
const date = require(__dirname + "/date.js");

//here we are requring our app through express
const app = express();

const items = ["But Food", "Cook Food", "Eat Food"];

//empty array to store work route entries
const workItems = [];

//using ejs view engine in our site
app.set("view engine", "ejs");

//using the body parser
app.use(bodyParser.urlencoded({ extended: true }));

//to tell express to serve styles.css file as a static resource
app.use(express.static("public"));

//here we are defining the route location for our site
app.get("/", function (req, res) {

    const day = date.getDate();


    //placing this code here ensures that after a lot of logic that is being run above only after the logic the message will be loaded
    res.render("list", { listTitle: day, newListItems: items });;

});


//this code catches the value of the new item 
app.post("/", function (req, res) {


    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {

        items.push(item);
        res.redirect("/");



    }


});

//this is to target our work route 
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

//this is to post to our work route
// app.post("/work", function (req, res) {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// });


//this would ensure our app is accessible on port 3000
app.listen(3000, function () {
    console.log("Server has started on port 3000");
});