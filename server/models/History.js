const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        citizenProfile: {
    age: Number,
    gender: String,
    occupation: String,
    education: String,
    category: String,
    annualIncome: Number,
    state: String,
    isFarmer: Boolean,
    isStudent: Boolean,
    isDisabled: Boolean,
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
        aiRecommendation: {
    summary: String,
    schemes: [
        {
            name: String,
            whyEligible: [String],
            benefits: [String],
            documents: [String],
            nextSteps: [String],
        },
    ],
    finalAdvice: String,
},
    },{
        timestamps:true,
    }
);

module.exports=mongoose.model("History",historySchema);