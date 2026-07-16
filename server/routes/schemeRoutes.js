const {seedSchemes,getAllSchemes,checkEligibility}=require('../controllers/schemeController')

const express=require('express');

const protect= require('../middleware/authMiddleware')

const router=express.Router();

router.post('/seed',protect,seedSchemes);

router.get('/',protect,getAllSchemes);

router.post('/check-eligibility',protect,checkEligibility);

module.exports=router;