import { useEffect, useState } from "react";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import BackButton from "../../components/BackButton";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";
import GlassInput from "../../components/GlassInput";
import PageTitle from "../../components/PageTitle";

const AdminHistory = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const filtered = history.filter((item) => {
      const userName = item.user?.name || "";
      const email = item.user?.email || "";

      return (
        userName.toLowerCase().includes(search.toLowerCase()) ||
        email.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredHistory(filtered);
  }, [search, history]);

  const fetchHistory = async () => {
    try {
      const { data } = await api.get("/admin/history");

      setHistory(data.history);
      setFilteredHistory(data.history);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <BackButton />

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">

          <PageTitle
            title="Recommendation History"
            subtitle="View all user eligibility checks"
          />

          <div className="relative w-full md:w-96">

            <Search
              size={20}
              className="absolute left-4 top-3.5 text-white"
            />

            <GlassInput
              type="text"
              placeholder="Search by user name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12"
            />

          </div>

        </div>

        <GlassCard className="overflow-hidden">

          <table className="w-full text-white">

            <thead className="bg-white/10 backdrop-blur-md">

              <tr>

                <th className="px-6 py-4 text-left">
                  User
                </th>

                <th className="px-6 py-4 text-left">
                  Email
                </th>

                <th className="px-6 py-4 text-left">
                  Eligible Schemes
                </th>

                <th className="px-6 py-4 text-left">
                  Checked On
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredHistory.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-300"
                  >
                    No History Found
                  </td>

                </tr>

              ) : (

                filteredHistory.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b border-white/10 hover:bg-white/10 transition"
                  >

                    <td className="px-6 py-5 font-semibold">
                      {item.user?.name || "Unknown User"}
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      {item.user?.email || "N/A"}
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      {item.eligibleSchemes?.length || 0}
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-center">

                        <GlassButton
                          onClick={() =>
                            navigate(`/admin/history/${item._id}`)
                          }
                          className="p-2 border-cyan-400 text-cyan-300 hover:border-cyan-300"
                        >
                          <Eye size={18} />
                        </GlassButton>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </GlassCard>

      </div>
    </div>
  );
};

export default AdminHistory;