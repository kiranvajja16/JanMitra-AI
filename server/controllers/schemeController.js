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
module.exports={seedSchemes,getAllSchemes}