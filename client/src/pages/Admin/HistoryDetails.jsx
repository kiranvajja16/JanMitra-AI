import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import BackButton from "../../components/BackButton";
import GlassCard from "../../components/GlassCard";
import PageTitle from "../../components/PageTitle";

const HistoryDetails = () => {
  const { id } = useParams();


  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get(`/admin/history/${id}`);
      setHistory(data.history);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  if (!history) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 text-xl">
        History not found.
      </div>
    );
  }

  const profile = history.citizenProfile;

  return (

  <div className="min-h-screen">
    <BackButton />

    <div className="max-w-6xl mx-auto">

      <PageTitle
        title="Recommendation Details"
        subtitle="Complete eligibility recommendation history"
      />

      {/* User Information */}

      <GlassCard className="p-8 mt-6 mb-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          User Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-gray-200">

          <div>
            <span className="font-semibold text-white">
              Name:
            </span>{" "}
            {history.user?.name}
          </div>

          <div>
            <span className="font-semibold text-white">
              Email:
            </span>{" "}
            {history.user?.email}
          </div>

          <div>
            <span className="font-semibold text-white">
              Checked On:
            </span>{" "}
            {new Date(history.createdAt).toLocaleString()}
          </div>

        </div>

      </GlassCard>

      {/* Citizen Profile */}

      <GlassCard className="p-8 mb-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Citizen Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-6 text-gray-200">

          <div>
            <strong className="text-white">Age:</strong>{" "}
            {profile.age}
          </div>

          <div>
            <strong className="text-white">Gender:</strong>{" "}
            {profile.gender}
          </div>

          <div>
            <strong className="text-white">
              Occupation:
            </strong>{" "}
            {profile.occupation}
          </div>

          <div>
            <strong className="text-white">
              Education:
            </strong>{" "}
            {profile.education}
          </div>

          <div>
            <strong className="text-white">
              Category:
            </strong>{" "}
            {profile.category}
          </div>

          <div>
            <strong className="text-white">
              Annual Income:
            </strong>{" "}
            ₹{profile.annualIncome}
          </div>

          <div>
            <strong className="text-white">
              State:
            </strong>{" "}
            {profile.state}
          </div>

          <div>
            <strong className="text-white">
              Farmer:
            </strong>{" "}
            {profile.isFarmer ? "Yes" : "No"}
          </div>

          <div>
            <strong className="text-white">
              Student:
            </strong>{" "}
            {profile.isStudent ? "Yes" : "No"}
          </div>

          <div>
            <strong className="text-white">
              Disabled:
            </strong>{" "}
            {profile.isDisabled ? "Yes" : "No"}
          </div>

        </div>

      </GlassCard>
            {/* Eligible Schemes */}

      <GlassCard className="p-8 mb-6">

        <h2 className="text-2xl font-bold text-green-400 mb-6">
          Eligible Schemes ({history.eligibleSchemes?.length || 0})
        </h2>

        {history.eligibleSchemes?.length > 0 ? (

          <div className="space-y-6">

            {history.eligibleSchemes.map((scheme, index) => (

              <div
                key={index}
                className="
                  bg-white/5
                  border
                  border-green-500/20
                  rounded-2xl
                  p-6
                  backdrop-blur-md
                "
              >

                <h3 className="text-2xl font-semibold text-cyan-300 mb-3">
                  {scheme.schemeName}
                </h3>

                <p className="text-gray-300 mb-6">
                  {scheme.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                  <div>

                    <h4 className="text-lg font-semibold text-green-300 mb-3">
                      Benefits
                    </h4>

                    <ul className="list-disc list-inside space-y-2 text-gray-300">

                      {scheme.benefits?.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}

                    </ul>

                  </div>

                  <div>

                    <h4 className="text-lg font-semibold text-yellow-300 mb-3">
                      Required Documents
                    </h4>

                    <ul className="list-disc list-inside space-y-2 text-gray-300">

                      {scheme.requiredDocuments?.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}

                    </ul>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <p className="text-gray-300">
            No eligible schemes found.
          </p>

        )}

      </GlassCard>

      {/* Other Matching Schemes */}

      {history.otherSchemes?.length > 0 && (

        <GlassCard className="p-8 mb-6">

          <h2 className="text-2xl font-bold text-yellow-400 mb-6">
            Other Matching Schemes
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {history.otherSchemes.map((scheme, index) => (

              <div
                key={index}
                className="
                  bg-white/5
                  border
                  border-yellow-500/20
                  rounded-2xl
                  p-5
                  backdrop-blur-md
                "
              >

                <h3 className="text-xl font-semibold text-white">
                  {scheme.schemeName}
                </h3>

                <p className="text-gray-300 mt-3">
                  {scheme.description}
                </p>

              </div>

            ))}

          </div>

        </GlassCard>

      )}
        

      {history.aiRecommendation && (

        <GlassCard className="p-8 mb-6">

          <h2 className="text-2xl font-bold text-purple-400 mb-6">
            AI Recommendation
          </h2>

          <div className="bg-white/5 border border-purple-500/20 rounded-2xl p-6 mb-8">

            <h3 className="text-xl font-semibold text-purple-300 mb-3">
              Summary
            </h3>

            <p className="text-gray-300 leading-7">
              {history.aiRecommendation.summary}
            </p>

          </div>

          <div className="space-y-8">

            {history.aiRecommendation.schemes?.map((scheme, index) => (

              <div
                key={index}
                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-2xl
                  p-6
                  backdrop-blur-md
                "
              >

                <h3 className="text-2xl font-bold text-cyan-300 mb-6">
                  {scheme.name}
                </h3>

                <div className="grid md:grid-cols-2 gap-8">

                  <div>

                    <h4 className="text-lg font-semibold text-green-300 mb-3">
                      Why Eligible
                    </h4>

                    <ul className="list-disc list-inside space-y-2 text-gray-300">

                      {scheme.whyEligible?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}

                    </ul>

                  </div>

                  <div>

                    <h4 className="text-lg font-semibold text-blue-300 mb-3">
                      Benefits
                    </h4>

                    <ul className="list-disc list-inside space-y-2 text-gray-300">

                      {scheme.benefits?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}

                    </ul>

                  </div>

                  <div>

                    <h4 className="text-lg font-semibold text-yellow-300 mb-3">
                      Documents
                    </h4>

                    <ul className="list-disc list-inside space-y-2 text-gray-300">

                      {scheme.documents?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}

                    </ul>

                  </div>

                  <div>

                    <h4 className="text-lg font-semibold text-pink-300 mb-3">
                      Next Steps
                    </h4>

                    <ul className="list-disc list-inside space-y-2 text-gray-300">

                      {scheme.nextSteps?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}

                    </ul>

                  </div>

                </div>

              </div>

            ))}

          </div>

          <div
            className="
              mt-8
              rounded-2xl
              border
              border-cyan-400/30
              bg-cyan-500/10
              backdrop-blur-md
              p-6
            "
          >

            <h3 className="text-xl font-bold text-cyan-300 mb-3">
              Final Advice
            </h3>

            <p className="text-gray-300 leading-7">
              {history.aiRecommendation.finalAdvice}
            </p>

          </div>

        </GlassCard>

      )}

    </div>
  </div>
);
};


export default HistoryDetails;