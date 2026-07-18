import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { Users, FileText, History, UserPlus } from "lucide-react";
import api from "../../services/api";

const Admin = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSchemes: 0,
    totalHistory: 0,
    recentUsers: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/admin/dashboard");
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold">Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold text-blue-700 mb-8">
        Admin Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <Users className="text-blue-600 mb-3" size={40} />

          <h2 className="text-4xl font-bold">
            {stats.totalUsers}
          </h2>

          <p className="text-gray-500 mt-2">
            Registered Users
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <FileText className="text-green-600 mb-3" size={40} />

          <h2 className="text-4xl font-bold">
            {stats.totalSchemes}
          </h2>

          <p className="text-gray-500 mt-2">
            Government Schemes
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <History className="text-orange-600 mb-3" size={40} />

          <h2 className="text-4xl font-bold">
            {stats.totalHistory}
          </h2>

          <p className="text-gray-500 mt-2">
            Eligibility Checks
          </p>
        </div>

      </div>

      {/* Recent Users */}

      <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

        <div className="flex items-center gap-3 mb-6">

          <UserPlus className="text-blue-600" />

          <h2 className="text-2xl font-bold">
            Recently Registered Users
          </h2>

        </div>

        {stats.recentUsers.length === 0 ? (
          <p className="text-gray-500">
            No users found.
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="p-3 text-left">Name</th>

                  <th className="p-3 text-left">Email</th>

                  <th className="p-3 text-left">Role</th>

                  <th className="p-3 text-left">Joined</th>

                </tr>

              </thead>

              <tbody>

                {stats.recentUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="border-b hover:bg-slate-50"
                  >

                    <td className="p-3 font-medium">
                      {user.name}
                    </td>

                    <td className="p-3">
                      {user.email}
                    </td>

                    <td className="p-3">
                      <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm capitalize">
                        {user.role}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* Quick Actions */}

      <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-4 gap-5">

         <button
            onClick={() => navigate("/admin/schemes")}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl"
          >
            Manage Schemes
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold transition"
          >
            Manage Users
          </button>

          <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-4 font-semibold transition">
             View History
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-4 font-semibold transition">
             Reports
          </button>

        </div>

      </div>

    </div>
  );
};

export default Admin;