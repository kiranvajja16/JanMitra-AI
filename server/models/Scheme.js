const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    schemeName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      default: "India",
    },

    description: {
      type: String,
      required: true,
    },

    benefits: [
      {
        type: String,
      },
    ],

    eligibility: {
      minAge: Number,
      maxAge: Number,

      gender: {
        type: String,
        default: "Any",
      },

      occupation: {
        type: String,
        default: "Any",
      },

      education: {
        type: String,
        default: "Any",
      },

      category: {
        type: String,
        default: "Any",
      },

      maxIncome: Number,
    },

    requiredDocuments: [
      {
        type: String,
      },
    ],

    officialLink: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scheme", schemeSchema);