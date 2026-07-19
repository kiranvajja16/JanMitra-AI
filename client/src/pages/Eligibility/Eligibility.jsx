import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { checkEligibility } from "../../services/schemeService";
import { useNavigate } from "react-router-dom";

const Eligibility = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    state: "",
    category: "",
    annualIncome: "",
    occupation: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await checkEligibility(formData);

    navigate("/results", {
      state: {
        data,
      },
    });
  } catch (err) {
  console.error("Full Error:", err);
  console.error("Response:", err.response);
  console.error("Data:", err.response?.data);
  console.error("Status:", err.response?.status);

  alert("Failed to check eligibility.");
}
};

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">
          Check Your Eligibility
        </h1>

        <p className="text-gray-500 mb-8">
          Enter your details to discover the government schemes you're eligible for.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <div>
            <label className="block mb-2 font-medium">Age</label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>


          <div>
            <label className="block mb-2 font-medium">Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">State</label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>


          <div>
            <label className="block mb-2 font-medium">Category</label>

            <select
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">Select Occupation</option>
              <option value="Farmer">Farmer</option>
              <option value="Student">Student</option>
              <option value="Government Employee">Government Employee</option>
              <option value="Private Employee">Private Employee</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Daily Wage Worker">Daily Wage Worker</option>
              <option value="Homemaker">Homemaker</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Retired">Retired</option>
              <option value="Other">Other</option>
            </select>
          </div>


          <div>
            <label className="block mb-2 font-medium">
              Annual Income
            </label>

            <input
              type="number"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>


          <div>
            <label className="block mb-2 font-medium">
              Occupation
            </label>

            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />
          </div>


          

          <div className="md:col-span-2">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              Find Schemes
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Eligibility;