require('dotenv').config({ path: '.env' })
const express = require('express')
const app = express()
const fruits = require('./models/fruits.js')
const mongoose = require('mongoose')
const Fruit = require('./models/fruits.js')
const methodOverride = require('method-override')

const PORT = process.env.PORT || 3000;



//MUST BE FIRST 
//middleware
app.use((req, res, next)=>{
  console.log('I run for all routes')
  next()
})
//keep this near the top 
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

//set up view engine above routes
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'

//create seed data to populate database 
app.get('/fruits/seed', (req, res)=>{
  Fruit.create([
      {
          name:'grapefruit',
          color:'pink',
          readyToEat:true
      },
      {
          name:'grape',
          color:'purple',
          readyToEat:false
      },
      {
          name:'avocado',
          color:'green',
          readyToEat:true
      }
  ], (err, data)=>{
      res.redirect('/fruits');
  })
});

//index route : Show ALL 
app.get('/fruits', function (req, res) {
  Fruit.find({}, (error, allFruits) => {
    res.render('Index', {
      fruits: allFruits
    })
  })
})

//create a page that will allow us to create a new fruit 
app.get('/fruits/new', (req,res)=>{
  res.render('New')
})

//show route 
app.get('/fruits/:id', function(req, res){
  Fruit.findById(req.params.id, (err, foundFruit)=>{
    res.render('Show', {fruit:foundFruit})
  })
})

//form POST 
app.post('/fruits/', (req, res)=>{
  if(req.body.readyToEat === 'on'){//if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true //set equal to true so it doesn't get passed as 'on' 
  }
  else {
    //if it is not checked req.body.readyToEat is undefined
    req.body.readyToEat = false
  }
  Fruit.create(req.body, (error, createdFruit)=>{
    res.redirect('/fruits')
  })
  
  console.log(fruits)
  console.log(req.body)
})


//Delete: Delete one
app.delete('/fruits/:id', (req, res)=>{
  Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/fruits');//redirect back to fruits index
  });
});

//edit
app.get('/fruits/:id/edit', (req, res)=>{
  Fruit.findById(req.params.id, (err, foundFruit)=>{ //find the fruit
    if(!err){
      res.render(
        'Edit',
      {
        fruit: foundFruit //pass in found fruit
      }
    );
  } else {
    res.send({ msg: err.message })
  }
  });
});

//PUT
app.put('/fruits/:id', (req, res)=>{
  if(req.body.readyToEat === 'on'){
      req.body.readyToEat = true;
  } else {
      req.body.readyToEat = false;
  }
  Fruit.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      res.redirect('/fruits')
  });
});

//connect to mongo database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})


app.listen(PORT, () => {
  console.log("listening")
})
