const express = require('express')
const router = express.Router();


const jsonData = require('../data/data.json')

//GET
router.get('/',(req,res) =>{
    // res.send(jsonData)
    res.json(jsonData);
})

router.post('/', (req,res) =>{
    console.log('data', req.body)
    res.send('success')
})






module.exports = router