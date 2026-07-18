import { useLocation } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const Results = () => {
  const { state } = useLocation();

  const data = state?.data;

  if (!data) {
    return (
      <MainLayout>
        <h2 className="text-2xl font-bold text-center mt-10">
          No recommendations found.
        </h2>
      </MainLayout>
    );
  }

  const ai = data.aiExplanation || {};

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        🤖 AI Recommendation
      </h1>

      {/* AI Summary */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          AI Recommendation Summary
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Summary
          </h3>

          <p className="text-gray-700">
            {ai.summary || "No AI summary available."}
          </p>
        </div>

        {ai.schemes?.length > 0 &&
          ai.schemes.map((scheme, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 mb-6 bg-gray-50"
            >
              <h3 className="text-xl font-bold text-blue-600 mb-4">
                {scheme.name}
              </h3>

              {/* Why Eligible */}
              <div className="mb-4">
                <h4 className="font-semibold text-green-700 mb-2">
                  ✅ Why Eligible
                </h4>

                <ul className="list-disc list-inside">
                  {scheme.whyEligible?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="mb-4">
                <h4 className="font-semibold text-blue-700 mb-2">
                  🎁 Benefits
                </h4>

                <ul className="list-disc list-inside">
                  {scheme.benefits?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Documents */}
              <div className="mb-4">
                <h4 className="font-semibold text-purple-700 mb-2">
                  📄 Required Documents
                </h4>

                <ul className="list-disc list-inside">
                  {scheme.documents?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Next Steps */}
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">
                  🚀 Next Steps
                </h4>

                <ol className="list-decimal list-inside">
                  {scheme.nextSteps?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
            </div>
          ))}

        <div className="bg-blue-50 rounded-lg p-5 mt-6">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">
            💡 Final Advice
          </h3>

          <p>
            {ai.finalAdvice ||
              "Please review the recommended government schemes below and apply through the official portals."}
          </p>
        </div>
      </div>

      {/* Eligible Schemes */}
      <h2 className="text-2xl font-bold mb-4">
        Eligible Schemes ({data.totalEligible})
      </h2>

      <div className="grid gap-6">
        {data.eligibleSchemes?.map((scheme, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-blue-600">
                {scheme.schemeName}
              </h3>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                {scheme.score}%
              </span>
            </div>

            <p className="mt-4 text-gray-700">
              {scheme.description}
            </p>

            <div className="mt-4">
              <h4 className="font-semibold">
                Benefits
              </h4>

              <p>{scheme.benefits}</p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">
                Required Documents
              </h4>

              <p>
                {Array.isArray(scheme.requiredDocuments)
                  ? scheme.requiredDocuments.join(", ")
                  : scheme.requiredDocuments}
              </p>
            </div>

            <a
              href={scheme.officialLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Results;