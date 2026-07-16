const Scheme = require('../models/Scheme');
const schemes = require('../data/schemes');

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
        const {age,gender,occupation,education,category,
            income,state,
        }=req.body;
        const schemes= await Scheme.find();
        const eligibleSchemes = schemes.filter((scheme)=>{
            const e=scheme.eligibility;
            const ageMatch=
            age >= e.minAge &&
            age <= e.maxAge;
            
            const genderMatch=
            e.gender === "Any" ||
            e.gender.toLowerCase() === gender.toLowerCase();

            const occupationMatch = 
            e.occupation === "Any" ||
            e.occupation.toLowerCase() === occupation.toLowerCase();

            const educationMatch  = 
            e.education === "Any" ||
            e.education.toLowerCase() === education.toLowerCase();
            
            const categoryMatch = 
            e.category === "Any" ||
            e.category.toLowerCase().includes(category.toLowerCase());

            const incomeMatch = 
            income <= e.maxIncome;

            const stateMatch =
            scheme.state === "India" ||
            scheme.state.toLowerCase() === state.toLowerCase();
            
            return (
                ageMatch && genderMatch &&
                occupationMatch && educationMatch &&
                categoryMatch && incomeMatch &&
                stateMatch
            );
            
        });
        res.json({
            success:true,
            totalEligible : eligibleSchemes.length,
            schemes : eligibleSchemes,
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