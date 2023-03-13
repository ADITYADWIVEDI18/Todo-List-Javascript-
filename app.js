/*jshint esversion: 6 */

const express = require("express")
const bodyParser = require("body-parser")

const app = express() 

var items= [];
var workItems=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.listen(3000, function () { 
    console.log("Server Started on port 3000");
})

app.get("/", function (req, res) {

    var today = new Date();
   
    var options = {
        weekDay: "long",
        day: "numeric",
        month:"long"
    };

    var day= today.toLocaleDateString("en-US" , options);

    res.render('lists', { listTitle: day , newListItems:items });
})

app.post("/" , function(req,res){

    console.log(req.body);

     var item =req.body.newItem;

     items.push(item);

    res.redirect("/");
})

app.get("/work" , function(req,res){

    res.render("lists",{listTitle: "Work Lists" , newListItems:workItems});
})

app.post("/work" , function(req,res){

    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})
