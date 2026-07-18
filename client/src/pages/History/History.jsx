import { useEffect, useState ,useCallback} from "react";
import MainLayout from "../../layouts/MainLayout";
import { getHistory, deleteHistory } from "../../services/historyService";
import { toast } from "react-hot-toast";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const fetchHistory = useCallback( async () => {
    try {
      const data = await getHistory();
      console.log("History API Response:", data);
      setHistory(data.history);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  },[]);
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);

      setHistory((prev) => prev.filter((item) => item._id !== id));

      toast.success("History deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-center mt-10">Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Recommendation History
      </h1>

      {history.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          No recommendation history found.
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">
                  {item.createdAt
  ? new Date(item.createdAt).toLocaleString()
  : "No Date"}
                </h2>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">
                <div className="bg-green-100 rounded-lg p-4">
                  <h3 className="font-semibold">Eligible Schemes</h3>
                  <p className="text-2xl font-bold">
                    {item.eligibleSchemes?.length || 0}
                  </p>
                </div>

                <div className="bg-yellow-100 rounded-lg p-4">
                  <h3 className="font-semibold">Other Schemes</h3>
                  <p className="text-2xl font-bold">
                    {item.otherSchemes?.length || 0}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-semibold text-blue-600 mb-2">
                  AI Recommendation
                </h3>

                <div className="mt-5">
                    <h3 className="font-semibold text-blue-600 mb-2">
                      AI Recommendation
                    </h3>

                    <p className="text-gray-700">
                      {item.aiRecommendation?.summary || "No summary available"}
                    </p>

                    <div className="mt-3 bg-blue-50 p-3 rounded-lg">
                      <strong>Final Advice</strong>

                      <p className="mt-2">
                        {item.aiRecommendation?.finalAdvice || "No advice available"}
                      </p>
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default History;