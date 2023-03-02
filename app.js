const express = require('express');
const app = new express();
const logger = require('morgan')
const cors = require('cors')
const color = require('colors') //color



const bodyParser = require('body-parser');



require('dotenv').config()


const PORT = process.env.PORT


app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(logger('dev')) 
app.use(cors())

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());

const data = require('./data/data.json')
const fs =require('fs')

var result = fs.readdirSync('data');
//console.log('Read output is '.green + result);
// end




//API calling

//home page: /
const welcome =  require('./routes/welcome')
app.use('/',welcome)


//main page with json page: /main
const main = require('./routes/main')
app.use('/api/main',main)

//create a  json using post and save a file in ./data folder
const create = require('./routes/create')
app.use('/api/create',create)


//get single data from json by district /district/Kannur 
app.get('/class/:H_Location',(req,res) => {
    const Place_locate = req.params.H_Location;

    const Place = data.filter((Place) => Place.H_Location === Place_locate);
    
    try {
        res.send(Place);
        console.log(Place)
        
    } catch (error) {
        console.log(error)
    }
    

})






//Server
app.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`.black.bgWhite.underline);
    //console.log(data) //json file
})