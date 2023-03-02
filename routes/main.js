const express = require('express')
const router = express.Router();




//GET
router.get('/',(req,res) =>{
    const jsonData = require('../data/newJSON.json')
    res.json(jsonData);
})







module.exports = router