const express = require("express");
const bodyparser = require("body-parser");
const app = express();
let items = ["by Food","cook Food","eat Food"];
let workitems = ["homework"];
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
   var today = new Date();
   var options = {
     weekday:"long",
     day: "numeric",
     month: "long"
   };

   var day = today.toLocaleDateString("en-US", options);
  res.render("List", {ListTitle: day, newlistitems: items});
});

app.post("/",function(req,res){
 let item = req.body.newitem;

 if(req.body.List === "work"){
   workitems.push(item);
   res.redirect("/work");
 }else{
   items.push(item);
    res.redirect("/");
 }
});

app.get("/work",function(req,res){
  res.render("List", {ListTitle: "Work List", newlistitems: workitems});
});

app.post("/work",function(req,res){
 var item = req.body.newitem;
 workitems.push(item);
  res.redirect("/work");
})

app.listen(7000,function(){
console.log("server started on port 7000");
});
