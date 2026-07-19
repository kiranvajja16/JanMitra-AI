import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";
import GlassInput from "../../components/GlassInput";
import GlassSelect from "../../components/GlassSelect";
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
      console.error(err);
      alert("Failed to check eligibility.");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-bold text-white mb-3">
          Check Your <span className="text-cyan-400">Eligibility</span>
        </h1>

        <p className="text-gray-300 mb-10 text-lg">
          Enter your details to discover the government schemes that match your profile.
        </p>

        <GlassCard className="p-8">

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >

            {/* Age */}

            <div>
              <label className="block mb-3 text-white font-medium">
                Age
              </label>

              <GlassInput
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                required
              />
            </div>

            {/* Gender */}

            <div>
              <label className="block mb-3 text-white font-medium">
                Gender
              </label>

              <GlassSelect
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </GlassSelect>
            </div>

            {/* State */}

            <div>
              <label className="block mb-3 text-white font-medium">
                State
              </label>

              <GlassInput
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter State"
              />
            </div>

            {/* Category */}

            <div>
              <label className="block mb-3 text-white font-medium">
                Category
              </label>

              <GlassSelect
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option>General</option>
                <option>OBC</option>
                <option>SC</option>
                <option>ST</option>
                <option>EWS</option>
              </GlassSelect>
            </div>

            {/* Income */}

            <div>
              <label className="block mb-3 text-white font-medium">
                Annual Income
              </label>

              <GlassInput
                type="number"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                placeholder="Enter Annual Income"
              />
            </div>

            {/* Occupation */}

            <div>
              <label className="block mb-3 text-white font-medium">
                Occupation
              </label>

              <GlassSelect
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
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
              </GlassSelect>
            </div>

            <div className="md:col-span-2 pt-4">

              <GlassButton
                type="submit"
                className="w-full py-4 text-lg font-semibold hover:scale-[1.02]"
              >
                Find Eligible Schemes
              </GlassButton>

            </div>

          </form>

        </GlassCard>

      </div>
    </MainLayout>
  );
};

export default Eligibility;