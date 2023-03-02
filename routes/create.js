const express = require('express')
const router = express.Router();
const fs =require('fs')


//GET
router.get('/',(req,res) =>{

    res.send('Welcome to Server')
    

    // reading directory through get
    fs.readdir('data',(err,res) =>{
        if(err){
            console.log('Path not found');
        }
        else{
            console.log('The directory is: '.yellow+ res)
        }
    })
});



//CREATE A JSON FILE USING .post and writeFile

router.post('/', (req, res) => {
    const { id, Hospital_Name, Patient_Count, H_Location } = req.body;
    const newData = {
        id,
        Hospital_Name, 
        Patient_Count, 
        H_Location
    };
  
    res.json(newData);

    fs.writeFile('./data/newJSON.json', JSON.stringify([newData], null, 2), err => {
            try {
                console.log('newJSON.json File Successfully Created!'.yellow);
            } catch (error) {
                console.log(error);
            }


    });

});

//add data with put
router.put('/',(req, res) =>{
    const data = require('../data/newJSON.json')
    data.push(req.body)
    
    fs.writeFile('./data/newJSON.json', JSON.stringify(data),(err) =>{
        if (err) {
            res.send('Data cannot be Added')
        }
        else {
            console.log(' Successfully added data '.yellow)
            res.send(data)
        }
    })
});




//delete created newJOSN.json

router.delete('/', (req,res) =>{
    const filePath = './data/newJSON.json';
    fs.access(filePath, error => {
        if (!error) {
        fs.unlink(filePath,function(error){
        if(error) console.error('Error Occured:', error);
            console.log('File deleted Successfully!'.red);
            res.send('Deleted Successfully');
        });
        } else {
            console.error('Error Occured:', error);
        }
        
    });
  })








module.exports = router