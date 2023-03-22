const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function(req, res){
    // res.send("<h1>Everything is Running</h1>");
    const today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, addedItems: items});

});

app.post("/", function(req, res){

    let item = req.body.toDo;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }

});


app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", addedItems: workItems});
});

app.post("/work", function(req, res){
    let item = req.body.toDo;
    workItems.push(item);
    res.redirect("/work");
});


app.listen(3000, function(){
    console.log("Server is running Successfully");
});

