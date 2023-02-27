const express = require('express');
const app = new express();
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT

app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(logger('dev')) 
app.use(cors())

const data = require('./data/data.json')


//Path using fs
const fs =require('fs')
fs.readdir('data',(err,res) =>{
    if(err){
        console.log('Path not found');
    }
    else{
        console.log('The directory is: '+ res)
    }
})

var result = fs.readdirSync('data');
console.log('Read output is ' + result);
// end




//API calling

//home page: /
const welcome =  require('./routes/welcome')
app.use('/',welcome)

//main page with json page: /main
const main = require('./routes/main')
app.use('/main',main)

//get single data from json by district /district/Kannur 
app.get('/class/:H_Location',(req,res) => {
    const Place_locate = req.params.H_Location;

    const Place = data.filter((Place) => Place.H_Location === Place_locate);
    res.send(Place);

})






















app.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`);
    console.log(data) //json file
})