import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import SchemeForm from "../../components/SchemeForm";
import BackButton from "../../components/BackButton";
import GlassCard from "../../components/GlassCard";
import PageTitle from "../../components/PageTitle";

const EditScheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchScheme();
  }, []);

  const fetchScheme = async () => {
    try {
      const { data } = await api.get(`/admin/schemes/${id}`);

      const scheme = data.scheme;

      setFormData({
        schemeName: scheme.schemeName,
        category: scheme.category,
        state: scheme.state,
        description: scheme.description,
        benefits: scheme.benefits.join(", "),
        requiredDocuments: scheme.requiredDocuments.join(", "),
        officialLink: scheme.officialLink || "",

        eligibility: {
          minAge: scheme.eligibility?.minAge || "",
          maxAge: scheme.eligibility?.maxAge || "",
          gender: scheme.eligibility?.gender || "Any",
          occupation: scheme.eligibility?.occupation || "Any",
          education: scheme.eligibility?.education || "Any",
          category: scheme.eligibility?.category || "Any",
          maxIncome: scheme.eligibility?.maxIncome || "",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load scheme");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEligibilityChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      eligibility: {
        ...prev.eligibility,
        [e.target.name]: e.target.value,
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

      await api.put(`/admin/schemes/${id}`, payload);

      toast.success("Scheme Updated Successfully");

      navigate("/admin/schemes");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update scheme");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
  <div className="min-h-screen">
    <BackButton />

    <div className="max-w-5xl mx-auto">

      <PageTitle
        title="Edit Government Scheme"
        subtitle="Update the scheme details below"
      />

      <GlassCard className="p-8 mt-6">

        <SchemeForm
          formData={formData}
          handleChange={handleChange}
          handleEligibilityChange={handleEligibilityChange}
          handleSubmit={handleSubmit}
          submitText="Update Scheme"
        />

      </GlassCard>

    </div>
  </div>
);
};

export default EditScheme;