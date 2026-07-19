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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

      const data = await checkEligibility(formData);

      navigate("/results", {
        state: {
          data,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to check eligibility.");
    } finally {
      setLoading(false);
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



            <div>
              <label className="block mb-3 text-white font-medium">
                Gender
              </label>

              <GlassSelect
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled className="text-gray-500 bg-gray-900">
                  Select Gender
                </option>

                <option value="Male" className="bg-gray-900 text-white">
                  Male
                </option>

                <option value="Female" className="bg-gray-900 text-white">
                  Female
                </option>

                <option value="Any" className="bg-gray-900 text-white">
                  Any
                </option>
              </GlassSelect>
            </div>

            

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

            

            <div>
              <label className="block mb-3 text-white font-medium">
                Category
              </label>

              <GlassSelect
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="" disabled className="text-gray-500 bg-gray-900">
                  Select Category
                </option>

                <option value="General" className="bg-gray-900 text-white">
                  General
                </option>

                <option value="OBC" className="bg-gray-900 text-white">
                  OBC
                </option>

                <option value="SC" className="bg-gray-900 text-white">
                  SC
                </option>

                <option value="ST" className="bg-gray-900 text-white">
                  ST
                </option>

                <option value="Any" className="bg-gray-900 text-white">
                  Any
                </option>
              </GlassSelect>
            </div>



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


            <div>
              <label className="block mb-3 text-white font-medium">
                Occupation
              </label>

              <GlassSelect
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
              >
                <option value="" >Select Occupation</option>
                <option value="Farmer" className="bg-gray-900 text-white">Farmer</option>
                <option value="Student" className="bg-gray-900 text-white">Student</option>
                <option value="Government Employee" className="bg-gray-900 text-white">Government Employee</option>
                <option value="Private Employee" className="bg-gray-900 text-white">Private Employee</option>
                <option value="Self-Employed" className="bg-gray-900 text-white">Self-Employed</option>
                <option value="Business Owner" className="bg-gray-900 text-white">Business Owner</option>
                <option value="Daily Wage Worker" className="bg-gray-900 text-white">Daily Wage Worker</option>
                <option value="Homemaker" className="bg-gray-900 text-white">Homemaker</option>
                <option value="Unemployed" className="bg-gray-900 text-white">Unemployed</option>
                <option value="Retired" className="bg-gray-900 text-white">Retired</option>
                <option value="Other" className="bg-gray-900 text-white">Other</option>
              </GlassSelect>
            </div>

            <div className="md:col-span-2 pt-4">

              <GlassButton
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-semibold hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Checking Eligibility...
                  </div>
                ) : (
                  "Find Eligible Schemes"
                )}
              </GlassButton>

            </div>

          </form>

        </GlassCard>

      </div>
    </MainLayout>
  );
};

export default Eligibility;