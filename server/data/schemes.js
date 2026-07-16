const schemes = [
  {
    schemeName: "PM Scholarship Scheme",
    category: "Education",
    state: "India",
    description:
      "Provides financial assistance to meritorious students pursuing higher education.",

    benefits: [
      "Annual scholarship",
      "Financial support for tuition fees",
      "Encourages higher education"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 25,
      gender: "Any",
      occupation: "Student",
      education: "Degree",
      category: "Any",
      maxIncome: 250000
    },

    requiredDocuments: [
      "Aadhaar Card",
      "Income Certificate",
      "Bonafide Certificate",
      "Bank Passbook"
    ],

    officialLink: "https://scholarships.gov.in"
  },

  {
    schemeName: "Central Sector Scholarship Scheme",
    category: "Education",
    state: "India",
    description:
      "Scholarship for students with outstanding academic performance in higher education.",

    benefits: [
      "Annual scholarship",
      "Supports undergraduate and postgraduate education"
    ],

    eligibility: {
      minAge: 17,
      maxAge: 25,
      gender: "Any",
      occupation: "Student",
      education: "Degree",
      category: "Any",
      maxIncome: 450000
    },

    requiredDocuments: [
      "Aadhaar Card",
      "10+2 Marks Memo",
      "Income Certificate"
    ],

    officialLink: "https://scholarships.gov.in"
  },

  {
    schemeName: "AICTE Pragati Scholarship",
    category: "Education",
    state: "India",
    description:
      "Scholarship for girl students pursuing technical education.",

    benefits: [
      "Financial assistance",
      "Supports technical education"
    ],

    eligibility: {
      minAge: 17,
      maxAge: 30,
      gender: "Female",
      occupation: "Student",
      education: "Engineering",
      category: "Any",
      maxIncome: 800000
    },

    requiredDocuments: [
      "Aadhaar Card",
      "Admission Letter",
      "Income Certificate"
    ],

    officialLink: "https://www.aicte-india.org"
  },

  {
    schemeName: "AICTE Saksham Scholarship",
    category: "Education",
    state: "India",
    description:
      "Scholarship for differently-abled students pursuing technical education.",

    benefits: [
      "Annual scholarship",
      "Support for technical education"
    ],

    eligibility: {
      minAge: 17,
      maxAge: 30,
      gender: "Any",
      occupation: "Student",
      education: "Engineering",
      category: "Any",
      maxIncome: 800000
    },

    requiredDocuments: [
      "Disability Certificate",
      "Income Certificate",
      "Admission Letter"
    ],

    officialLink: "https://www.aicte-india.org"
  },

  {
    schemeName: "Post Matric Scholarship",
    category: "Education",
    state: "India",
    description:
      "Scholarship for students belonging to reserved categories pursuing post-matric education.",

    benefits: [
      "Tuition fee reimbursement",
      "Maintenance allowance"
    ],

    eligibility: {
      minAge: 16,
      maxAge: 35,
      gender: "Any",
      occupation: "Student",
      education: "Any",
      category: "SC/ST/OBC",
      maxIncome: 250000
    },

    requiredDocuments: [
      "Caste Certificate",
      "Income Certificate",
      "Bonafide Certificate"
    ],

    officialLink: "https://scholarships.gov.in"
  },

  {
    schemeName: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    state: "India",
    description:
      "Income support scheme for eligible farmer families.",

    benefits: [
      "₹6000 annual financial assistance",
      "Direct Benefit Transfer"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 100,
      gender: "Any",
      occupation: "Farmer",
      education: "Any",
      category: "Any",
      maxIncome: 10000000
    },

    requiredDocuments: [
      "Aadhaar Card",
      "Land Records",
      "Bank Account"
    ],

    officialLink: "https://pmkisan.gov.in"
  },

  {
    schemeName: "Kisan Credit Card",
    category: "Agriculture",
    state: "India",
    description:
      "Provides affordable agricultural loans to farmers.",

    benefits: [
      "Low-interest loans",
      "Easy agricultural credit"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 75,
      gender: "Any",
      occupation: "Farmer",
      education: "Any",
      category: "Any",
      maxIncome: 10000000
    },

    requiredDocuments: [
      "Aadhaar Card",
      "Land Records",
      "Bank Passbook"
    ],

    officialLink: "https://www.myscheme.gov.in"
  },

  {
    schemeName: "PM Fasal Bima Yojana",
    category: "Agriculture",
    state: "India",
    description:
      "Crop insurance scheme protecting farmers against crop losses.",

    benefits: [
      "Crop insurance",
      "Financial protection"
    ],

    eligibility: {
      minAge: 18,
      maxAge: 100,
      gender: "Any",
      occupation: "Farmer",
      education: "Any",
      category: "Any",
      maxIncome: 10000000
    },

    requiredDocuments: [
      "Land Records",
      "Aadhaar Card",
      "Bank Passbook"
    ],

    officialLink: "https://pmfby.gov.in"
  },

  {
    schemeName: "Ayushman Bharat PM-JAY",
    category: "Healthcare",
    state: "India",
    description:
      "Health insurance scheme providing cashless treatment to eligible families.",

    benefits: [
      "Health insurance up to ₹5 Lakhs",
      "Cashless hospitalization"
    ],

    eligibility: {
      minAge: 0,
      maxAge: 100,
      gender: "Any",
      occupation: "Any",
      education: "Any",
      category: "Any",
      maxIncome: 300000
    },

    requiredDocuments: [
      "Aadhaar Card",
      "Ration Card"
    ],

    officialLink: "https://pmjay.gov.in"
  },

  {
    schemeName: "Jan Aushadhi Scheme",
    category: "Healthcare",
    state: "India",
    description:
      "Provides quality generic medicines at affordable prices through Jan Aushadhi Kendras.",

    benefits: [
      "Low-cost medicines",
      "Affordable healthcare"
    ],

    eligibility: {
      minAge: 0,
      maxAge: 100,
      gender: "Any",
      occupation: "Any",
      education: "Any",
      category: "Any",
      maxIncome: 10000000
    },

    requiredDocuments: [
      "Valid Prescription"
    ],

    officialLink: "https://janaushadhi.gov.in"
  }
,
{
  schemeName: "PM Mudra Yojana",
  category: "Entrepreneurship",
  state: "India",
  description:
    "Provides collateral-free loans to micro and small businesses.",

  benefits: [
    "Loan up to ₹10 Lakhs",
    "No collateral",
    "Supports startups and MSMEs"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 65,
    gender: "Any",
    occupation: "Business",
    education: "Any",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "PAN Card",
    "Bank Account",
    "Business Proof"
  ],

  officialLink: "https://www.mudra.org.in"
},

{
  schemeName: "Prime Minister Employment Generation Programme (PMEGP)",
  category: "Entrepreneurship",
  state: "India",
  description:
    "Financial assistance to establish new micro-enterprises.",

  benefits: [
    "Subsidized business loan",
    "Government financial assistance"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 60,
    gender: "Any",
    occupation: "Business",
    education: "8th Pass",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "PAN Card",
    "Project Report"
  ],

  officialLink: "https://www.kviconline.gov.in"
},

{
  schemeName: "Stand-Up India",
  category: "Entrepreneurship",
  state: "India",
  description:
    "Promotes entrepreneurship among women and SC/ST entrepreneurs.",

  benefits: [
    "Business loans",
    "Support for new enterprises"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 60,
    gender: "Any",
    occupation: "Business",
    education: "Any",
    category: "SC/ST",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "PAN Card",
    "Business Plan"
  ],

  officialLink: "https://www.standupmitra.in"
},

{
  schemeName: "Skill India Mission",
  category: "Skill Development",
  state: "India",
  description:
    "Provides industry-relevant skill training to youth.",

  benefits: [
    "Free skill training",
    "Certification",
    "Employment opportunities"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 45,
    gender: "Any",
    occupation: "Unemployed",
    education: "Any",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Educational Certificates"
  ],

  officialLink: "https://www.skillindia.gov.in"
},

{
  schemeName: "National Apprenticeship Promotion Scheme (NAPS)",
  category: "Employment",
  state: "India",
  description:
    "Encourages youth to gain practical industry experience through apprenticeships.",

  benefits: [
    "Monthly stipend",
    "Industry experience",
    "Government-supported apprenticeship"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 35,
    gender: "Any",
    occupation: "Student",
    education: "Diploma",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Educational Certificates",
    "Bank Passbook"
  ],

  officialLink: "https://www.apprenticeshipindia.gov.in"
},

{
  schemeName: "PM Internship Scheme",
  category: "Employment",
  state: "India",
  description:
    "Provides internship opportunities for students and fresh graduates.",

  benefits: [
    "Industry exposure",
    "Monthly stipend",
    "Certificate"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 30,
    gender: "Any",
    occupation: "Student",
    education: "Degree",
    category: "Any",
    maxIncome: 800000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "College ID",
    "Resume"
  ],

  officialLink: "https://pminternship.mca.gov.in"
},

{
  schemeName: "Sukanya Samriddhi Yojana",
  category: "Women",
  state: "India",
  description:
    "Savings scheme for the education and marriage of girl children.",

  benefits: [
    "High interest savings",
    "Tax benefits"
  ],

  eligibility: {
    minAge: 0,
    maxAge: 10,
    gender: "Female",
    occupation: "Any",
    education: "Any",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Birth Certificate",
    "Aadhaar Card"
  ],

  officialLink: "https://www.indiapost.gov.in"
},

{
  schemeName: "Beti Bachao Beti Padhao",
  category: "Women",
  state: "India",
  description:
    "Promotes education and welfare of the girl child.",

  benefits: [
    "Educational support",
    "Awareness programs"
  ],

  eligibility: {
    minAge: 0,
    maxAge: 18,
    gender: "Female",
    occupation: "Student",
    education: "Any",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Birth Certificate",
    "Aadhaar Card"
  ],

  officialLink: "https://wcd.gov.in"
},

{
  schemeName: "Atal Pension Yojana",
  category: "Social Security",
  state: "India",
  description:
    "Pension scheme for workers in the unorganized sector.",

  benefits: [
    "Guaranteed pension after 60 years",
    "Government-backed pension"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 40,
    gender: "Any",
    occupation: "Any",
    education: "Any",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Bank Account"
  ],

  officialLink: "https://www.npscra.nsdl.co.in"
},

{
  schemeName: "PM Jeevan Jyoti Bima Yojana",
  category: "Insurance",
  state: "India",
  description:
    "Affordable life insurance scheme for Indian citizens.",

  benefits: [
    "₹2 lakh life insurance",
    "Low annual premium"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 50,
    gender: "Any",
    occupation: "Any",
    education: "Any",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Bank Account"
  ],

  officialLink: "https://jansuraksha.gov.in"
}
,
{
  schemeName: "Jagananna Amma Vodi",
  category: "Education",
  state: "Andhra Pradesh",
  description: "Financial assistance to eligible mothers or guardians to encourage school education.",

  benefits: [
    "Financial assistance for children's education",
    "Reduces school dropout rates"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 60,
    gender: "Female",
    occupation: "Any",
    education: "Any",
    category: "Any",
    maxIncome: 300000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Student ID",
    "Bank Passbook"
  ],

  officialLink: "https://services.india.gov.in/service/detail/amma-vodi-status-check-andhra-pradesh-1"
},

{
  schemeName: "YSR Rythu Bharosa",
  category: "Agriculture",
  state: "Andhra Pradesh",
  description: "Income support scheme for eligible farmer families.",

  benefits: [
    "Annual financial assistance",
    "Support for agricultural expenses"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    occupation: "Farmer",
    education: "Any",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Land Records",
    "Bank Account"
  ],

  officialLink: "https://kadapa.ap.gov.in/navaratnalu/"
},

{
  schemeName: "Jagananna Vidya Deevena",
  category: "Education",
  state: "Andhra Pradesh",
  description: "Fee reimbursement support for eligible students pursuing higher education.",

  benefits: [
    "Fee reimbursement",
    "Higher education support"
  ],

  eligibility: {
    minAge: 17,
    maxAge: 30,
    gender: "Any",
    occupation: "Student",
    education: "Degree",
    category: "Any",
    maxIncome: 800000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Income Certificate",
    "Bonafide Certificate"
  ],

  officialLink: "https://kadapa.ap.gov.in/navaratnalu/"
},

{
  schemeName: "YSR Arogyasri",
  category: "Healthcare",
  state: "Andhra Pradesh",
  description: "Health insurance scheme providing cashless treatment to eligible families.",

  benefits: [
    "Cashless treatment",
    "Major medical procedures covered"
  ],

  eligibility: {
    minAge: 0,
    maxAge: 100,
    gender: "Any",
    occupation: "Any",
    education: "Any",
    category: "Any",
    maxIncome: 500000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Health Card"
  ],

  officialLink: "https://kadapa.ap.gov.in/navaratnalu/"
},

{
  schemeName: "YSR Cheyutha",
  category: "Women",
  state: "Andhra Pradesh",
  description: "Financial support for eligible women to improve livelihoods.",

  benefits: [
    "Financial assistance",
    "Support for self-employment"
  ],

  eligibility: {
    minAge: 45,
    maxAge: 60,
    gender: "Female",
    occupation: "Any",
    education: "Any",
    category: "SC/ST/BC/Minority",
    maxIncome: 500000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Caste Certificate",
    "Income Certificate"
  ],

  officialLink: "https://kadapa.ap.gov.in/navaratnalu/"
},

{
  schemeName: "YSR Bima",
  category: "Insurance",
  state: "Andhra Pradesh",
  description: "Insurance coverage for registered unorganised workers.",

  benefits: [
    "Accident insurance",
    "Natural death benefit",
    "Disability assistance"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 70,
    gender: "Any",
    occupation: "Unorganised Worker",
    education: "Any",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Bank Account"
  ],

  officialLink: "https://www.bima.ap.gov.in/About.aspx"
},

{
  schemeName: "PM Awas Yojana",
  category: "Housing",
  state: "India",
  description: "Affordable housing assistance for eligible families.",

  benefits: [
    "Housing subsidy",
    "Affordable home ownership"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 100,
    gender: "Any",
    occupation: "Any",
    education: "Any",
    category: "Any",
    maxIncome: 600000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Income Certificate"
  ],

  officialLink: "https://pmaymis.gov.in"
},

{
  schemeName: "PM Suraksha Bima Yojana",
  category: "Insurance",
  state: "India",
  description: "Accident insurance scheme at an affordable annual premium.",

  benefits: [
    "Accident insurance",
    "Low premium"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 70,
    gender: "Any",
    occupation: "Any",
    education: "Any",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Bank Account"
  ],

  officialLink: "https://jansuraksha.gov.in"
},

{
  schemeName: "National Social Assistance Programme",
  category: "Social Security",
  state: "India",
  description: "Provides financial assistance to elderly, widows and persons with disabilities.",

  benefits: [
    "Monthly pension",
    "Social security support"
  ],

  eligibility: {
    minAge: 60,
    maxAge: 100,
    gender: "Any",
    occupation: "Any",
    education: "Any",
    category: "Any",
    maxIncome: 300000
  },

  requiredDocuments: [
    "Aadhaar Card",
    "Income Certificate"
  ],

  officialLink: "https://nsap.nic.in"
},

{
  schemeName: "Digital India Internship Scheme",
  category: "Employment",
  state: "India",
  description: "Internship opportunities for students in digital governance and technology.",

  benefits: [
    "Internship",
    "Industry exposure",
    "Certificate"
  ],

  eligibility: {
    minAge: 18,
    maxAge: 30,
    gender: "Any",
    occupation: "Student",
    education: "Degree",
    category: "Any",
    maxIncome: 10000000
  },

  requiredDocuments: [
    "Resume",
    "College ID",
    "Aadhaar Card"
  ],

  officialLink: "https://www.digitalindia.gov.in"
}
];

module.exports = schemes;