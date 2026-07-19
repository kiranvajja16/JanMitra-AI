import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";

import { getHistoryById } from "../../services/historyService";

const HistoryDet = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getHistoryById(id);
      setHistory(data.history);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load history details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-white text-2xl font-semibold">
            Loading...
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!history) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-red-400 text-2xl font-semibold">
            History not found.
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        <GlassButton
          onClick={() => navigate("/history")}
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to History
        </GlassButton>

        <h1 className="text-5xl font-bold text-white mb-3">
          Recommendation{" "}
          <span className="text-cyan-400">
            Details
          </span>
        </h1>

        <p className="text-gray-300 mb-10 text-lg">
          View complete citizen information, eligible schemes,
          AI recommendation and final advice.
        </p>

                {/* Citizen Profile */}

        <GlassCard className="p-8 mb-10">

          <h2 className="text-3xl font-bold text-cyan-400 mb-8">
            Citizen Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <GlassCard className="p-5">
              <p className="text-gray-400">Age</p>
              <p className="text-white text-xl font-semibold mt-2">
                {history.citizenProfile?.age}
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <p className="text-gray-400">Gender</p>
              <p className="text-white text-xl font-semibold mt-2">
                {history.citizenProfile?.gender}
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <p className="text-gray-400">Occupation</p>
              <p className="text-white text-xl font-semibold mt-2">
                {history.citizenProfile?.occupation}
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <p className="text-gray-400">Education</p>
              <p className="text-white text-xl font-semibold mt-2">
                {history.citizenProfile?.education || "N/A"}
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <p className="text-gray-400">Category</p>
              <p className="text-white text-xl font-semibold mt-2">
                {history.citizenProfile?.category}
              </p>
            </GlassCard>

            <GlassCard className="p-5">
              <p className="text-gray-400">Annual Income</p>
              <p className="text-white text-xl font-semibold mt-2">
                ₹{history.citizenProfile?.annualIncome}
              </p>
            </GlassCard>

            <GlassCard className="p-5 md:col-span-2 lg:col-span-3">
              <p className="text-gray-400">State</p>
              <p className="text-white text-xl font-semibold mt-2">
                {history.citizenProfile?.state}
              </p>
            </GlassCard>

          </div>

        </GlassCard>

        {/* Eligible Schemes */}

        <div className="mb-12">

          <h2 className="text-3xl font-bold text-green-400 mb-8">
            Eligible Schemes ({history.eligibleSchemes?.length || 0})
          </h2>

          <div className="space-y-8">

            {history.eligibleSchemes?.map((scheme, index) => (

              <GlassCard
                key={index}
                className="p-8 hover:scale-[1.01] transition-all duration-300"
              >

                <h3 className="text-3xl font-bold text-white">
                  {scheme.schemeName}
                </h3>

                <p className="text-gray-300 mt-4 leading-8">
                  {scheme.description}
                </p>

                <div className="mt-8">

                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">
                    Benefits
                  </h4>

                  <ul className="list-disc ml-6 space-y-2 text-gray-200">

                    {scheme.benefits?.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}

                  </ul>

                </div>

                <div className="mt-8">

                  <h4 className="text-xl font-semibold text-cyan-400 mb-3">
                    Required Documents
                  </h4>

                  <ul className="list-disc ml-6 space-y-2 text-gray-200">

                    {scheme.requiredDocuments?.map((doc, i) => (
                      <li key={i}>{doc}</li>
                    ))}

                  </ul>

                </div>

                {scheme.officialLink && (

                  <a
                    href={scheme.officialLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-8 px-6 py-3 rounded-xl bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30 transition"
                  >
                    Visit Official Website →
                  </a>

                )}

              </GlassCard>

            ))}

          </div>

        </div>

                {/* Other Schemes */}

        <div className="mb-12">

          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Other Schemes ({history.otherSchemes?.length || 0})
          </h2>

          <div className="space-y-8">

            {history.otherSchemes?.map((scheme, index) => (

              <GlassCard
                key={index}
                className="p-8 hover:scale-[1.01] transition-all duration-300"
              >

                <h3 className="text-3xl font-bold text-white">
                  {scheme.schemeName}
                </h3>

                <p className="text-gray-300 mt-4 leading-8">
                  {scheme.description}
                </p>

              </GlassCard>

            ))}

          </div>

        </div>

        {/* AI Recommendation */}

        <GlassCard className="p-8 mb-10">

          <h2 className="text-3xl font-bold text-cyan-400 mb-5">
            🤖 AI Recommendation
          </h2>

          <p className="text-gray-200 leading-8">
            {history.aiRecommendation?.summary ||
              "No AI recommendation available."}
          </p>

        </GlassCard>

        {/* Final Advice */}

        <GlassCard className="p-8 mb-10">

          <h2 className="text-3xl font-bold text-green-400 mb-5">
            💡 Final Advice
          </h2>

          <p className="text-gray-200 leading-8">
            {history.aiRecommendation?.finalAdvice ||
              "No final advice available."}
          </p>

        </GlassCard>

      </div>
    </MainLayout>
  );
};

export default HistoryDet;