const express = require('express');
const app = new express();
const logger = require('morgan')
const cors = require('cors')
const color = require('colors')



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

//Path using fs



//read the json file using fs.readFile

// fs.readFile('./data/data.json','utf-8',(err,res) =>{

//     if (err){
//         console.log('Something went wrong here '.red+err);
//     }
//     else{
//         try {
//             const hospital = JSON.parse(res);
//             const location = hospital.map(hospital =>hospital.H_Location);
//             // console.log(res);
//             console.log('Hospital Locations: '.green+ location);
    
//         } catch (err) {
//             console.log('Error parsing JSON '.red,err)
            
//         }

//     }
// })




// app.put('/api/create', (req, res) => {
//     const { id, Hospital_Name, Patient_Count, H_Location } = req.body;
//     const newData = {
//     id,
//     Hospital_Name,
//     Patient_Count,
//     H_Location
// };



// fs.appendFile('./data/newJSON.json',JSON.stringify(newData, null, 2), err =>{
//     if(err){
//         console.log(err);

//     }
//     else{
//         console.log('File Successfully written!'.green);
//         res.send('done')
//     }
// })

// });
  app.delete('/api/delete', (req,res) =>{
    const filePath = './data/newJSON.json';
    fs.access(filePath, error => {
        if (!error) {
        fs.unlink(filePath,function(error){
        if(error) console.error('Error Occured:', error);
            console.log('File deleted!');
            res.send('Deleted Successfully');
        });
        } else {
            console.error('Error Occured:', error);
        }
        
    });
  })





//Creating a json file and add datas
// const newData = {
//     id: 1,
//     Hospital_Name: 'Hospital D',
//     Patient_Count: 210,
//     H_Location: 'TVM'
// };


// fs.writeFile('./data/newData.json',JSON.stringify(newData, null, 2), err =>{
//     if(err){
//         console.log(err);

//     }
//     else{
//         console.log('File Successfully written!'.green);
//     }
// })

// end 


// add a text
// const newData1 = {
//     id: 5,
//     Hospital_Name: 'Hospital E',
//     Patient_Count: 20,
//     H_Location: '"ALPY'
// };

// fs.appendFile("./data/newData.json",newData1,function(error){
//     if (error){
//         console.log('unable to write')
//     }
//     else{
//         console.log('done append working');
//     }
// });

var result = fs.readdirSync('data');
// console.log('Read output is '.green + result);
// end




//API calling

//home page: /
const welcome =  require('./routes/welcome')
app.use('/',welcome)


//main page with json page: /main
const main = require('./routes/main')
app.use('/main',main)

//create a  json using post and save a file in ./data folder
const create = require('./routes/create')
app.use('/create',create)


//get single data from json by district /district/Kannur 
app.get('/class/:H_Location',(req,res) => {
    const Place_locate = req.params.H_Location;

    const Place = data.filter((Place) => Place.H_Location === Place_locate);
    res.send(Place);

})













app.listen(PORT, ()=>{
    console.log(`Server is running in ${PORT}`.black.bgWhite.underline);
    //console.log(data) //json file
})