const Scheme = require('../models/Scheme');
const History = require('../models/History')
const schemes = require('../data/schemes');
const calculateEligibility= require('../utils/calculateEligibility');
const generateRecommendation = require('../services/geminiService');
const { ELIGIBLE_SCORE } = require("../utils/constants");

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

        const schemes = await Scheme.find(
        {},
        {
            schemeName:1,
            category:1,
            state:1,
            eligibility:1,
            benefits:1,
            requiredDocuments:1,
            officialLink:1,
            description:1
        });
        const recommendations = calculateEligibility(req.body, schemes);

        const eligibleSchemes = recommendations.filter(
            scheme => scheme.score >= ELIGIBLE_SCORE
        );

        const topSchemes = eligibleSchemes.slice(0,5);
        const aiExplanation = await generateRecommendation(
            req.body,
            topSchemes
        );


        const otherSchemes = recommendations.filter(
            scheme => scheme.score >= 30 && scheme.score < ELIGIBLE_SCORE
        );
        
        console.log("req.user in controller:", req.user);
        await History.create({
            user: req.user._id,
            citizenProfile:req.body,
            eligibleSchemes,
            otherSchemes,
            aiRecommendation:aiExplanation
        });

        res.json({
            success: true,
            totalSchemes: recommendations.length,
            totalEligible: eligibleSchemes.length,
            totalOther: otherSchemes.length,
            eligibleSchemes,
            otherSchemes,
            aiExplanation
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


module.exports={seedSchemes,getAllSchemes,checkEligibility};