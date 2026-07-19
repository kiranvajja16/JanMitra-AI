import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import SchemeForm from "../../components/SchemeForm";
import BackButton from "../../components/BackButton";

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
        error.response?.data?.message || "Failed to add scheme"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <BackButton/>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Add Government Scheme
        </h1>

        <SchemeForm
          formData={formData}
          handleChange={handleChange}
          handleEligibilityChange={handleEligibilityChange}
          handleSubmit={handleSubmit}
          submitText="Add Scheme"
        />
      </div>
    </div>
  );
};

export default AddScheme;