import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import BackButton from "../../components/BackButton";

const HistoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-slate-100 p-8">
      <BackButton/>
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/admin/history")}
          className="flex items-center gap-2 mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Recommendation Details
        </h1>

        {/* User Information */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4">
            User Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <span className="font-semibold">Name:</span>{" "}
              {history.user?.name}
            </div>

            <div>
              <span className="font-semibold">Email:</span>{" "}
              {history.user?.email}
            </div>

            <div>
              <span className="font-semibold">Checked On:</span>{" "}
              {new Date(history.createdAt).toLocaleString()}
            </div>

          </div>

        </div>

        {/* Citizen Profile */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-2xl font-bold mb-4">
            Citizen Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <strong>Age:</strong> {profile.age}
            </div>

            <div>
              <strong>Gender:</strong> {profile.gender}
            </div>

            <div>
              <strong>Occupation:</strong> {profile.occupation}
            </div>

            <div>
              <strong>Education:</strong> {profile.education}
            </div>

            <div>
              <strong>Category:</strong> {profile.category}
            </div>

            <div>
              <strong>Annual Income:</strong> ₹
              {profile.annualIncome}
            </div>

            <div>
              <strong>State:</strong> {profile.state}
            </div>

            <div>
              <strong>Farmer:</strong>{" "}
              {profile.isFarmer ? "Yes" : "No"}
            </div>

            <div>
              <strong>Student:</strong>{" "}
              {profile.isStudent ? "Yes" : "No"}
            </div>

            <div>
              <strong>Disabled:</strong>{" "}
              {profile.isDisabled ? "Yes" : "No"}
            </div>

          </div>

        </div>

                {/* Eligible Schemes */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Eligible Schemes ({history.eligibleSchemes?.length || 0})
          </h2>

          {history.eligibleSchemes?.length > 0 ? (
            <div className="space-y-5">

              {history.eligibleSchemes.map((scheme, index) => (

                <div
                  key={index}
                  className="border rounded-xl p-5 bg-green-50"
                >

                  <h3 className="text-xl font-semibold text-blue-700 mb-3">
                    {scheme.schemeName}
                  </h3>

                  <p className="text-gray-700 mb-3">
                    {scheme.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">

                    <div>

                      <h4 className="font-semibold mb-2">
                        Benefits
                      </h4>

                      <ul className="list-disc list-inside space-y-1">

                        {scheme.benefits?.map((benefit, i) => (
                          <li key={i}>{benefit}</li>
                        ))}

                      </ul>

                    </div>

                    <div>

                      <h4 className="font-semibold mb-2">
                        Required Documents
                      </h4>

                      <ul className="list-disc list-inside space-y-1">

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
            <p>No eligible schemes found.</p>
          )}

        </div>

        {/* Other Matching Schemes */}

        {history.otherSchemes?.length > 0 && (

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-bold text-yellow-600 mb-4">
              Other Matching Schemes
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              {history.otherSchemes.map((scheme, index) => (

                <div
                  key={index}
                  className="border rounded-lg p-4 bg-yellow-50"
                >

                  <h3 className="font-semibold">
                    {scheme.schemeName}
                  </h3>

                  <p className="text-sm text-gray-600 mt-2">
                    {scheme.description}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

        {/* AI Recommendation */}

        {history.aiRecommendation && (

          <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-2xl font-bold text-purple-700 mb-4">
              AI Recommendation
            </h2>

            <div className="bg-purple-50 rounded-lg p-4 mb-6">

              <h3 className="font-semibold mb-2">
                Summary
              </h3>

              <p>
                {history.aiRecommendation.summary}
              </p>

            </div>

            <div className="space-y-6">

              {history.aiRecommendation.schemes?.map((scheme, index) => (

                <div
                  key={index}
                  className="border rounded-xl p-5"
                >

                  <h3 className="text-xl font-bold text-blue-700 mb-4">
                    {scheme.name}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">

                    <div>

                      <h4 className="font-semibold mb-2">
                        Why Eligible
                      </h4>

                      <ul className="list-disc list-inside">

                        {scheme.whyEligible?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}

                      </ul>

                    </div>

                    <div>

                      <h4 className="font-semibold mb-2">
                        Benefits
                      </h4>

                      <ul className="list-disc list-inside">

                        {scheme.benefits?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}

                      </ul>

                    </div>

                    <div>

                      <h4 className="font-semibold mb-2">
                        Documents
                      </h4>

                      <ul className="list-disc list-inside">

                        {scheme.documents?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}

                      </ul>

                    </div>

                    <div>

                      <h4 className="font-semibold mb-2">
                        Next Steps
                      </h4>

                      <ul className="list-disc list-inside">

                        {scheme.nextSteps?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}

                      </ul>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-5 rounded">

              <h3 className="font-bold text-lg mb-2">
                Final Advice
              </h3>

              <p>
                {history.aiRecommendation.finalAdvice}
              </p>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default HistoryDetails;