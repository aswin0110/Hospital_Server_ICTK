const express = require('express')
const router = express.Router();


const jsonData = require('../data/newJSON.json')

//GET
router.get('/',(req,res) =>{
    // res.send(jsonData)
    res.json(jsonData);
})







module.exports = router