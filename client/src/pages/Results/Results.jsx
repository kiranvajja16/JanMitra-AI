import { useLocation } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const Results = () => {
  const { state } = useLocation();

  const data = state?.data;

  if (!data) {
    return (
      <MainLayout>
        <h2>No recommendations found.</h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        AI Recommendation
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">
          Gemini AI Summary
        </h2>

        <p className="text-gray-700">
          {data.aiExplanation}
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Eligible Schemes ({data.totalEligible})
      </h2>

      <div className="grid gap-6">

        {data.eligibleSchemes.map((scheme,index)=>(
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6"
          >

            <h3 className="text-xl font-bold text-blue-600">
              {scheme.schemeName}
            </h3>

            <p className="mt-2">
              Eligibility Score :
              <span className="font-bold text-green-600">
                {" "}
                {scheme.score}
              </span>
            </p>

            <p className="mt-3">
              {scheme.description}
            </p>

            <div className="mt-3">
              <strong>Benefits</strong>

              <p>{scheme.benefits}</p>
            </div>

            <a
              href={scheme.officialLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
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