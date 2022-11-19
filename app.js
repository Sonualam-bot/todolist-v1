const express = require("express");
const bodyParser = require("body-parser");


const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];

//to use ejs as it's view engine
app.set("view engine", "ejs");

//using body parser to make the post request
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    // res.send("Helllo")

    var today = new Date();
    var currentDay = today.getDay();
    // var day = "";

    // //to check what day it is
    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 0:
    //         day = "Monday";
    //         break;
    //     case 0:
    //         day = "Tuesday";
    //         break;
    //     case 0:
    //         day = "Wednesday";
    //         break;
    //     case 0:
    //         day = "THurday";
    //         break;
    //     case 0:
    //         day = "Friday";
    //         break;
    //     case 0:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log("Error current day is equal to " + currentDay);


    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);



    res.render("list",
        {
            kindOfDay: day,
            newListItems: items
        });

});

app.post("/", function (req, res) {
    var item = req.body.newItem;

    items.push(item);
    res.redirect("/");
});



app.listen(3000, function () {
    console.log("Server started on port 3000");
})