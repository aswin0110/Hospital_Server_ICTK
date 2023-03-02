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
//write to create a json file and add json's through body in postman 

router.post('/', (req, res) => {
    const { id, Hospital_Name, Patient_Count, H_Location } = req.body;
    const newData = {
        id,
        Hospital_Name, 
        Patient_Count, 
        H_Location
    };
  
    res.json(newData);

    fs.writeFile('./data/newJSON.json',JSON.stringify(newData, null, 2), err => {
        if(err) {

            console.log(err);
    
        }
        else{
            let jsonfile = require('./data/newJSON.json');
            res.send(jsonfile)
            console.log('newJSON.json File Successfully written!'.yellow);
        }

    });

});

// add new data's to the created json file

router.put('/', (req, res) => {
    const { id, Hospital_Name, Patient_Count, H_Location } = req.body;
    const newData = {
    id,
    Hospital_Name,
    Patient_Count,
    H_Location
};



fs.appendFile('./data/newJSON.json',JSON.stringify(newData, null, 2), err =>{
    if(err){
        console.log(err);

    }
    else{
        console.log('File Successfully written!'.green);
        res.send('done')
    }
})

});



//delete created json
router.delete('/', (req,res) =>{
    const filePath = './data/newJSON.json';
    fs.access(filePath, error => {
        if (!error) {
        fs.unlink(filePath,function(error){
        if(error) console.error('Error Occured:', error);
            console.log('File deleted!'.red);
            res.send('Deleted Successfully');
        });
        } else {
            console.error('Error Occured:', error);
        }
        
    });
  })






module.exports = router