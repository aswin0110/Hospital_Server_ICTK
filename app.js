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


//get single data from json by district /find/Kannur 

// const find = require('./routes/find')
// app.use('/find/:H_Location',find)

app.get('/find/:H_Location',(req,res) => {
    
    const Place_locate = req.params.H_Location;
    const data = require('./data/data.json')
    const Place = data.filter((Place) => Place.H_Location === Place_locate);
    
    try {
        res.send(Place);
        console.log(Place)
        
    } catch (error) {
        console.log(error)
    }
    

})

// app.delete('/data/:H_Location', (req, res) =>{
//     const data = require('./data/newJSON.json')
//     let {H_Location} = req.params;
//     let item = data.filter(item => item.H_Location !== H_Location)
//     fs.writeFile('./data/NewJSON.json', JSON.stringify(item),(err) =>{
//         try {
//             res.send("Data Deleted Successfully");
//             console.log('Deleted data')
            
//         } catch (error) {
//             // res.send("Data cannot be deleted")
//             console.log('err')
//         }
        
//     })
// })






//Server
app.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`.black.bgWhite.underline);
    //console.log(data) //json file
})