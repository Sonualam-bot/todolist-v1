//requring the packages that we just installed
const express = require("express");
const bodyParser = require("body-parser");



//now require mongoose package
const mongoose = require("mongoose");

//here we are requring our app through express
const app = express();




//using ejs view engine in our site
app.set("view engine", "ejs");

//using the body parser
app.use(bodyParser.urlencoded({ extended: true }));

//to tell express to serve styles.css file as a static resource
app.use(express.static("public"));

//Now to connect here with a database
mongoose.connect("mongodb://localhost:27017/todolistDB", {
    useNewUrlParser: true
});

//the items schema 
const itemsSchema = {
    name: String,

};

//mongoose model to implement the schema above
const Item = mongoose.model("Item", itemsSchema);

//mongoose items model
const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "Hit this to delete an item"
});

//now to add all the items into a common array
const defaultItems = [item1, item2, item3];


// to insert all this into the db in one go
// Item.insertMany(defaultItems, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved default items to DB.");
//     }
// });


//here we are defining the route location for our site
app.get("/", function (req, res) {


    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {
            // to insert all this into the db in one go
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully saved default items to DB.");
                }
            });
            res.redirect("/");
        } else {
            res.render("list", { listTitle: "Today", newListItems: foundItems });
        }



    });

    //placing this code here ensures that after a lot of logic that is being run above only after the logic the message will be loaded
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