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
    isFarmer: false,
    isStudent: false,
    isDisabled: false,
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

    const navigate = useNavigate();

    navigate("/results", {
      state: {
        data,
      },
    });
  } catch (err) {
    console.error(err);
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
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select</option>
              <option>General</option>
              <option>OBC</option>
              <option>SC</option>
              <option>ST</option>
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


          <div className="md:col-span-2 flex flex-wrap gap-6">
            <label>
              <input
                type="checkbox"
                name="isFarmer"
                checked={formData.isFarmer}
                onChange={handleChange}
              />{" "}
              Farmer
            </label>

            <label>
              <input
                type="checkbox"
                name="isStudent"
                checked={formData.isStudent}
                onChange={handleChange}
              />{" "}
              Student
            </label>

            <label>
              <input
                type="checkbox"
                name="isDisabled"
                checked={formData.isDisabled}
                onChange={handleChange}
              />{" "}
              Disabled
            </label>
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