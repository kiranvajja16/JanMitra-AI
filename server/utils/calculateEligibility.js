const {
    EXCELLENT_SCORE,
    GOOD_SCORE,
    AVERAGE_SCORE
} = require("./constants");
const calculateEligibility = (user,schemes) => {
    const recommendations = [];
    schemes.forEach((scheme)=>{
        let score =0;

        let matchedCriteria = [];
        let missingCriteria = [];

        const e = scheme.eligibility;

        if(user.age >= e.minAge && user.age <= e.maxAge){
            score += 15;
            matchedCriteria.push('Age');
        }
        else{
            missingCriteria.push('Age');
        }


        if(e.gender === "Any" || e.gender.toLowerCase()===user.gender.toLowerCase()){
            score += 10;
            matchedCriteria.push('Gender');
        }
        else{
            missingCriteria.push('Gender');
        }


        if(e.occupation === "Any" || e.occupation.toLowerCase()===user.occupation.toLowerCase()){
            score+=20;
            matchedCriteria.push('Occupation');
        }
        else{
            missingCriteria.push('Occupation');
        }


        if(e.education === "Any" || e.education.toLowerCase()===user.education.toLowerCase()){
            score += 20;
            matchedCriteria.push('Education');
        }
        else{
            missingCriteria.push('Education');
        }


        if(user.income <= e.maxIncome){
            score += 20;
            matchedCriteria.push('Income');
        }
        else{
            missingCriteria.push('Income');
        }


        if(e.category === "Any" ||e.category.toLowerCase().includes(user.category.toLowerCase())){
            score += 10;
            matchedCriteria.push('Category');
        }
        else{
            missingCriteria.push('Category');
        }


        if(scheme.state === "India" || scheme.state.toLowerCase()===user.state.toLowerCase()){
            score += 5;
            matchedCriteria.push('State');
        }
        else{
            missingCriteria.push('State');
        }

        let matchLevel = "Not Eligible";

        if (score >= EXCELLENT_SCORE) {
            matchLevel = "Excellent";
        }
        else if (score >= GOOD_SCORE) {
            matchLevel = "Good";
        }
        else if (score >= AVERAGE_SCORE) {
            matchLevel = "Average";
        }

        recommendations.push({
            _id: scheme._id,
            schemeName : scheme.schemeName,
            category: scheme.category,
            description: scheme.description,
            state: scheme.state,
            score,
            matchLevel,
            eligible : score >=GOOD_SCORE,
            matchedCriteria,
            missingCriteria,
            benefits : scheme.benefits,
            requiredDocuments: scheme.requiredDocuments,
            officialLink: scheme.officialLink
        });

    });
    recommendations.sort((a,b) => b.score - a.score);
    recommendations.forEach((scheme,index)=>{
        scheme.rank=index+1;
    });
    return recommendations;
}

module.exports= calculateEligibility;