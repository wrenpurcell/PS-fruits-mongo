const express = require('express');
const app = express();
const fruits = require('./models/fruits.js'); 

//MUST BE FIRST 
//middleware
app.use((req, res, next)=>{
  console.log('I run for all routes')
  next()
})
//keep this near the top 
app.use(express.urlencoded({extened:false}))

//set up view engine above routes
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

//create a page that will allow us to create a new fruit 
app.get('/fruits/new', (req,res)=>{
  res.render('New')
})

//index route
app.get('/fruits', function (req, res) {
  res.render("Index", { fruits: fruits });
}); 

//show route 
app.get('/fruits/:indexOfFruitsArray', function(req, res){
  res.render('Show', {//second param must be an object
    fruit: fruits[req.params.indexOfFruitsArray] 
    //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
  })
})

//form POST 
app.post('/fruits', (req, res)=>{
  if(req.body.readyToEat === 'on'){//if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true //set equal to true so it doesn't get passed as 'on' 
  }
  else {
    //if it is not checked req.body.readyToEat is undefined
    req.body.readyToEat = false
  }
  fruits.push(req.body)
  
  console.log(fruits)
  console.log(req.body)
  

  res.redirect('/fruits') //send the user back to /fruits
})




app.listen(3000, () => {
  console.log("listening");
});
