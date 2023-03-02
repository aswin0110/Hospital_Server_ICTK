const express = require('express')
const router = express.Router();
const fs =require('fs')

//get single data from json by district /district/Kannur 
router.get('/',(req,res) => {
    const data = require('../data/data.json')
    const Place_locate = req.params.H_Location;

    const Place = data.filter((Place) => Place.H_Location === Place_locate);
    
    try {
        res.send(Place);
        console.log(Place)
        
    } catch (error) {
        console.log(error)
    }
    

})







module.exports = router