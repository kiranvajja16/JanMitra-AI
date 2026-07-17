const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        citizenProfile:{
            age:Number,
            gender:String,
            occupation:String,
            education:String,
            category:String,
            income:Number,
            state:String,
        },
        eligibleSchemes:[
            {
                type:mongoose.Schema.Types.Mixed,
            },
        ],
        otherSchemes:[
            {
                type:mongoose.Schema.Types.Mixed,
            },
        ],
        aiRecommendation:{
            type:String,
        },
    },{
        timestamps:true,
    }
);

module.exports=mongoose.model("History",historySchema);