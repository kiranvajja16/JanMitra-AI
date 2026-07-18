const {
  EXCELLENT_SCORE,
  GOOD_SCORE,
  AVERAGE_SCORE,
} = require("./constants");

const calculateEligibility = (user, schemes) => {
  const recommendations = [];

  schemes.forEach((scheme) => {
    let score = 0;

    const matchedCriteria = [];
    const missingCriteria = [];

    const e = scheme.eligibility;

    // Safe user values
    const userGender = user.gender || "";
    const userOccupation = user.occupation || "";
    const userEducation = user.education || "";
    const userCategory = user.category || "";
    const userState = user.state || "";
    const userIncome = Number(user.annualIncome || 0);

    // Age
    if (user.age >= e.minAge && user.age <= e.maxAge) {
      score += 15;
      matchedCriteria.push("Age");
    } else {
      missingCriteria.push("Age");
    }

    // Gender
    if (
      e.gender === "Any" ||
      e.gender.toLowerCase() === userGender.toLowerCase()
    ) {
      score += 10;
      matchedCriteria.push("Gender");
    } else {
      missingCriteria.push("Gender");
    }

    // Occupation
    if (
      e.occupation === "Any" ||
      e.occupation.toLowerCase() === userOccupation.toLowerCase()
    ) {
      score += 20;
      matchedCriteria.push("Occupation");
    } else {
      missingCriteria.push("Occupation");
    }

    // Education
    if (
      e.education === "Any" ||
      e.education.toLowerCase() === userEducation.toLowerCase()
    ) {
      score += 20;
      matchedCriteria.push("Education");
    } else {
      missingCriteria.push("Education");
    }

    // Income
    if (userIncome <= e.maxIncome) {
      score += 20;
      matchedCriteria.push("Income");
    } else {
      missingCriteria.push("Income");
    }

    // Category
    if (
      e.category === "Any" ||
      e.category.toLowerCase() === userCategory.toLowerCase()
    ) {
      score += 10;
      matchedCriteria.push("Category");
    } else {
      missingCriteria.push("Category");
    }

    // State
    if (
      scheme.state === "India" ||
      scheme.state.toLowerCase() === userState.toLowerCase()
    ) {
      score += 5;
      matchedCriteria.push("State");
    } else {
      missingCriteria.push("State");
    }

    // Match Level
    let matchLevel = "Not Eligible";

    if (score >= EXCELLENT_SCORE) {
      matchLevel = "Excellent";
    } else if (score >= GOOD_SCORE) {
      matchLevel = "Good";
    } else if (score >= AVERAGE_SCORE) {
      matchLevel = "Average";
    }

    recommendations.push({
      _id: scheme._id,
      schemeName: scheme.schemeName,
      category: scheme.category,
      description: scheme.description,
      state: scheme.state,
      score,
      matchLevel,
      eligible: score >= GOOD_SCORE,
      matchedCriteria,
      missingCriteria,
      benefits: scheme.benefits,
      requiredDocuments: scheme.requiredDocuments,
      officialLink: scheme.officialLink,
    });
  });

  recommendations.sort((a, b) => b.score - a.score);

  recommendations.forEach((scheme, index) => {
    scheme.rank = index + 1;
  });

  return recommendations;
};

module.exports = calculateEligibility;