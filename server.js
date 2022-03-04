const express = require("express");
const app = express();
const fruits = require('./models/fruits.js'); 

//set up view engine
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.get('/fruits/:indexOfFruitsArray', function(req, res){
  res.render('Show', {//second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray] 
    //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  })
})
//index route
app.get("/fruits", function (req, res) {
  res.render("Index", { fruits: fruits });
}); 

app.get("/fruits/", (req, res) => {
  res.send(fruits);
});

// app.get("/fruits/:indexOfFruitsArray", (req, res) => {
//   res.send(fruits[req.params.indexOfFruitsArray]);
// });

app.listen(3001, () => {
  console.log("listening");
});
