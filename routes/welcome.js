const express = require('express')
const router = express.Router();


router.get('/',(req,res) =>{
    res.send('Welcome to my Case Study 2: please run using /api/main for getting alredy created json file in page, /create')
})







module.exports = router