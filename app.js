//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require('lodash');
// Load the core build.

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


let composeArray = [];


app.get("/", function (req, res) {

  res.render("home", {
    homeContent: homeStartingContent,
    composeArray: composeArray,
    titleR: req.body.composeTitle
  });

});

app.get("/about", function (req, res) {

  res.render("about", {
    aboutPageContent: aboutContent
  });

});

app.get("/contact", function (req, res) {

  res.render("contact", {
    contactPageContent: contactContent
  });

});

app.get("/compose", function (req, res) {

  res.render("compose");

});


/* var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

*/
let composeTitle = "";
let composeBody = "";

app.post("/compose", function (req, res) {

  const composeComplete = {
    title: req.body.composeTitle,
    body: req.body.composeBody
  };
  composeArray.push(composeComplete);
  res.redirect("/")

});

app.get("/compose/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  composeArray.forEach(function (composeComplete) {
    const storedTitle = _.lowerCase(composeComplete.title);
    if (requestedTitle === storedTitle) {
      res.render("post", {
        completedTitles: composeComplete.title,
        completedBodies: composeComplete.body
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});