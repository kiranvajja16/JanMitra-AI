const Scheme = require('../models/Scheme');
const schemes = require('../data/schemes');
const calculateEligibility= require('../utils/calculateEligibility');

const seedSchemes = async (req,res)=>{
    try{
        await Scheme.deleteMany();
        await Scheme.insertMany(schemes);
        res.status(201).json({
            success:true,
            message:'Government schemes inserted successfully.'
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'Server Error',
        });
    }
}

const getAllSchemes= async(req,res)=>{
    try{
        const data= await Scheme.find();
        res.json({
            success:true,
            count:data.length,
            schemes:data,
        });
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:'Server Error'
        });
    }
};

const checkEligibility = async (req,res)=>{
    try{
        const MINIMUM_SCORE = 70;
        const schemes= await Scheme.find();
        const recommendations = calculateEligibility(req.body, schemes);
        const eligibleSchemes = recommendations.filter(
            (scheme) => scheme.score >= MINIMUM_SCORE
        );

        const otherSchemes = recommendations.filter(
                scheme => scheme.score >= 30 && scheme.score < MINIMUM_SCORE
        );

        res.json({
            success: true,
            totalSchemes: recommendations.length,
            totalEligible: eligibleSchemes.length,
            totalOther: otherSchemes.length,
            eligibleSchemes,
            otherSchemes
});
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:'Server Error',
        });
    }
}


module.exports={seedSchemes,getAllSchemes,checkEligibility}