import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import api from "../../services/api";
import SchemeForm from "../../components/SchemeForm";
import BackButton from "../../components/BackButton";

import gen63 from "../../assets/gen63.jpg";

const AddScheme = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    schemeName: "",
    category: "",
    state: "India",
    description: "",
    benefits: "",
    requiredDocuments: "",
    officialLink: "",
    eligibility: {
      minAge: "",
      maxAge: "",
      gender: "Any",
      occupation: "Any",
      education: "Any",
      category: "Any",
      maxIncome: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEligibilityChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,

        benefits: formData.benefits
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        requiredDocuments: formData.requiredDocuments
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        eligibility: {
          ...formData.eligibility,
          minAge: Number(formData.eligibility.minAge),
          maxAge: Number(formData.eligibility.maxAge),
          maxIncome: Number(formData.eligibility.maxIncome),
        },
      };

      await api.post("/admin/schemes", payload);

      toast.success("Scheme Added Successfully");

      navigate("/admin/schemes");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add scheme"
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${gen63})`,
      }}
    >
      <div className="min-h-screen bg-black/60 py-10 px-4">

        <div className="max-w-6xl mx-auto">

          <BackButton />

          <div
            className="
              mt-6
              bg-white/10
              backdrop-blur-2xl
              border
              border-white/20
              rounded-3xl
              shadow-2xl
              p-8
              md:p-10
            "
          >
            <div className="mb-10">

              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Add Government
                <span className="text-cyan-400">
                  {" "}
                  Scheme
                </span>
              </h1>

              <p className="text-gray-300 mt-3">
                Create a new government welfare scheme with
                eligibility criteria, benefits and required
                documents.
              </p>

            </div>

            <SchemeForm
              formData={formData}
              handleChange={handleChange}
              handleEligibilityChange={handleEligibilityChange}
              handleSubmit={handleSubmit}
              submitText="Add Scheme"
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default AddScheme;