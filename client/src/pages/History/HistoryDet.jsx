import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import { getHistoryById } from "../../services/historyService";
import { toast } from "react-hot-toast";

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
        <p className="text-center mt-10 text-lg">Loading...</p>
      </MainLayout>
    );
  }

  if (!history) {
    return (
      <MainLayout>
        <p className="text-center mt-10 text-red-500">
          History not found.
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">

        <button
          onClick={() => navigate("/history")}
          className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={18} />
          Back to History
        </button>

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Recommendation Details
        </h1>

        {/* Citizen Profile */}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-5">
            Citizen Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <p><strong>Age:</strong> {history.citizenProfile?.age}</p>

            <p><strong>Gender:</strong> {history.citizenProfile?.gender}</p>

            <p><strong>Occupation:</strong> {history.citizenProfile?.occupation}</p>

            <p><strong>Education:</strong> {history.citizenProfile?.education || "N/A"}</p>

            <p><strong>Category:</strong> {history.citizenProfile?.category}</p>

            <p><strong>Annual Income:</strong> ₹{history.citizenProfile?.annualIncome}</p>

            <p><strong>State:</strong> {history.citizenProfile?.state}</p>

          </div>

        </div>

        {/* Eligible Schemes */}

        <div className="mb-10">

          <h2 className="text-2xl font-bold text-green-700 mb-5">
            Eligible Schemes ({history.eligibleSchemes?.length || 0})
          </h2>

          <div className="space-y-5">

            {history.eligibleSchemes?.map((scheme, index) => (
              <div
                key={index}
                className="bg-green-50 border border-green-200 rounded-xl p-6"
              >

                <h3 className="text-xl font-bold">
                  {scheme.schemeName}
                </h3>

                <p className="mt-3 text-gray-700">
                  {scheme.description}
                </p>

                <div className="mt-4">

                  <h4 className="font-semibold">
                    Benefits
                  </h4>

                  <ul className="list-disc ml-6 mt-2">
                    {scheme.benefits?.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>

                </div>

                <div className="mt-4">

                  <h4 className="font-semibold">
                    Required Documents
                  </h4>

                  <ul className="list-disc ml-6 mt-2">
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
                    className="inline-block mt-5 text-blue-600 font-semibold hover:underline"
                  >
                    Official Website →
                  </a>
                )}

              </div>
            ))}

          </div>

        </div>

        {/* Other Schemes */}

        <div className="mb-10">

          <h2 className="text-2xl font-bold text-yellow-700 mb-5">
            Other Schemes ({history.otherSchemes?.length || 0})
          </h2>

          <div className="space-y-5">

            {history.otherSchemes?.map((scheme, index) => (
              <div
                key={index}
                className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
              >

                <h3 className="text-xl font-bold">
                  {scheme.schemeName}
                </h3>

                <p className="mt-3 text-gray-700">
                  {scheme.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="bg-blue-50 rounded-xl shadow-md p-6 mb-8">

          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            AI Recommendation
          </h2>

          <p className="text-gray-700">
            {history.aiRecommendation?.summary}
          </p>

        </div>

        {/* Final Advice */}

        <div className="bg-purple-50 rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            Final Advice
          </h2>

          <p className="text-gray-700">
            {history.aiRecommendation?.finalAdvice}
          </p>

        </div>

      </div>
    </MainLayout>
  );
};

export default HistoryDet;