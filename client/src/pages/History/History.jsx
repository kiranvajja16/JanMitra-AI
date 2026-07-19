import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";

import {
  getHistory,
  deleteHistory,
} from "../../services/historyService";

const History = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await getHistory();
      setHistory(data.history);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);

      setHistory((prev) =>
        prev.filter((item) => item._id !== id)
      );

      toast.success("History deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
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

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-white mb-3">
          Recommendation{" "}
          <span className="text-cyan-400">
            History
          </span>
        </h1>

        <p className="text-gray-300 mb-10 text-lg">
          View all your previous eligibility checks and AI recommendations.
        </p>

        {history.length === 0 ? (
          <GlassCard className="p-12 text-center">

            <h2 className="text-3xl font-bold text-white">
              No History Found
            </h2>

            <p className="text-gray-300 mt-3">
              Start checking your eligibility to build your recommendation history.
            </p>

          </GlassCard>
        ) : (
          <div className="space-y-8">
                        {history.map((item) => (
              <GlassCard
                key={item._id}
                className="p-8 hover:scale-[1.01] transition-all duration-300"
              >

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

                  <div>

                    <h2 className="text-2xl font-bold text-white">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString()
                        : "No Date"}
                    </h2>

                    <p className="text-gray-300 mt-2">
                      Your eligibility result generated on the above date.
                    </p>

                  </div>

                  <div className="flex gap-4">

                    <GlassButton
                      onClick={() =>
                        navigate(`/history/${item._id}`)
                      }
                    >
                      View Details
                    </GlassButton>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-6 py-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-300 hover:bg-red-500/30 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-8">

                  <GlassCard className="p-6 text-center">

                    <h3 className="text-gray-300 uppercase tracking-wide">
                      Eligible Schemes
                    </h3>

                    <p className="text-5xl font-bold text-green-400 mt-4">
                      {item.eligibleSchemes?.length || 0}
                    </p>

                  </GlassCard>

                  <GlassCard className="p-6 text-center">

                    <h3 className="text-gray-300 uppercase tracking-wide">
                      Other Schemes
                    </h3>

                    <p className="text-5xl font-bold text-yellow-400 mt-4">
                      {item.otherSchemes?.length || 0}
                    </p>

                  </GlassCard>

                </div>

                <div className="mt-8">

                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">
                    AI Recommendation
                  </h3>

                  <GlassCard className="p-6">

                    <p className="text-gray-200 leading-8">
                      {item.aiRecommendation?.summary ||
                        "No summary available."}
                    </p>

                  </GlassCard>

                </div>

                <div className="mt-6">

                  <GlassCard className="p-6 border border-cyan-400/20">

                    <h3 className="text-xl font-bold text-cyan-300 mb-3">
                      Final Advice
                    </h3>

                    <p className="text-gray-200 leading-8">
                      {item.aiRecommendation?.finalAdvice ||
                        "No advice available."}
                    </p>

                  </GlassCard>

                </div>

              </GlassCard>
            ))}
                      </div>
        )}
      </div>
    </MainLayout>
  );
};

export default History;