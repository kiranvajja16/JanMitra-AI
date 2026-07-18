import { useEffect, useState } from "react";
import { Search, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";

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
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">
            Recommendation History
          </h1>
        </div>

        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search by user name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border rounded-xl pl-11 pr-4 py-3"
          />
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="text-left px-5 py-4">User</th>

                <th className="text-left px-5 py-4">Email</th>

                <th className="text-left px-5 py-4">
                  Eligible Schemes
                </th>

                <th className="text-left px-5 py-4">
                  Checked On
                </th>

                <th className="text-center px-5 py-4">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredHistory.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No History Found
                  </td>
                </tr>
              ) : (
                filteredHistory.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-semibold">
                      {item.user?.name || "Unknown User"}
                    </td>

                    <td className="px-5 py-4">
                      {item.user?.email || "N/A"}
                    </td>

                    <td className="px-5 py-4">
                      {item.eligibleSchemes?.length || 0}
                    </td>

                    <td className="px-5 py-4">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-center">

                        <button
                          onClick={() =>
                            navigate(`/admin/history/${item._id}`)
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                        >
                          <Eye size={18} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default AdminHistory;