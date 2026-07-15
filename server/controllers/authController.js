const User=require('../models/User');
const bcrypt = require('bcryptjs');

const registerUser = async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:'Please provide all required fields.',
            });
        }

        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message:'User already exists',
            });
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const user= await User.create({
            name,email,
            password:hashedPassword,
        });
        res.status(201).json({
            success:true,
            message:'User registered successfully',
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
            },
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Internal Server Error',
        });
    }
};

module.exports={registerUser}; 