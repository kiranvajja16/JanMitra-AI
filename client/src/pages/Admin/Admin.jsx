import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  FileText,
  History,
  UserPlus,
  LogOut,
  ArrowRight,
} from "lucide-react";

import api from "../../services/api";
import gen63 from "../../assets/gen63.jpg";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

 return (
  <div
  className="min-h-screen bg-cover bg-center bg-fixed"
  style={{
    backgroundImage: `url(${gen63})`,
  }}
>
  <div className="min-h-screen bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-sm">

    <div className="max-w-7xl mx-auto px-8 py-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-extrabold text-white">
            Admin Dashboard
          </h1>

          <p className="text-gray-300 mt-2 text-lg">
            Welcome back 
          </p>
          <p className="text-gray-300 mt-2 text-lg">
             Manage your Government Scheme Portal
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-3 rounded-xl
          bg-white/10
          backdrop-blur-md
          border border-white/20
          text-white
          hover:bg-transparent
          hover:border-red-500
          hover:text-red-400
          transition-all
          duration-500"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>



      <div className="grid lg:grid-cols-3 gap-8 mb-10">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-300 uppercase text-sm tracking-wider">
                Registered Users
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">
                {stats.totalUsers}
              </h2>

            </div>

            <div className="bg-blue-500/20 p-4 rounded-2xl">
              <Users className="text-blue-400" size={42} />
            </div>

          </div>

          <div className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 mt-8"></div>

        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-300 uppercase text-sm tracking-wider">
                Government Schemes
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">
                {stats.totalSchemes}
              </h2>

            </div>

            <div className="bg-green-500/20 p-4 rounded-2xl">
              <FileText className="text-green-400" size={42} />
            </div>

          </div>

          <div className="h-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 mt-8"></div>

        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-300 uppercase text-sm tracking-wider">
                Eligibility Checks
              </p>

              <h2 className="text-5xl font-bold text-white mt-4">
                {stats.totalHistory}
              </h2>

            </div>

            <div className="bg-orange-500/20 p-4 rounded-2xl">
              <History className="text-orange-400" size={42} />
            </div>

          </div>

          <div className="h-1 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 mt-8"></div>

        </div>

      </div>
            

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 mb-10">

        <div className="flex justify-between items-center mb-6">

          <div className="flex items-center gap-3">

            <div className="bg-blue-500/20 p-3 rounded-xl">
              <UserPlus className="text-blue-400" size={28} />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Recently Registered Users
              </h2>

              <p className="text-gray-300 text-sm">
                Latest users joined the platform
              </p>

            </div>

          </div>

        </div>

        {stats.recentUsers.length === 0 ? (

          <div className="text-center py-10">

            <p className="text-gray-300 text-lg">
              No users found.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto rounded-2xl">

            <table className="min-w-full text-white">

              <thead className="bg-white/10">

                <tr>

                  <th className="px-6 py-4 text-left">Name</th>

                  <th className="px-6 py-4 text-left">Email</th>

                  <th className="px-6 py-4 text-left">Role</th>

                  <th className="px-6 py-4 text-left">Joined</th>

                </tr>

              </thead>

              <tbody>

                {stats.recentUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="border-b border-white/10 hover:bg-white/10 transition"
                  >

                    <td className="px-6 py-4 font-semibold">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-gray-300">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">

                      <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm capitalize">
                        {user.role}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-gray-300">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>


      <div className="mb-10">

        <h2 className="text-3xl font-bold text-white mb-6">
          Quick Actions
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">



          <button
            onClick={() => navigate("/admin/schemes")}
            className="
            group
            relative
            overflow-hidden
            bg-white/5
            backdrop-blur-md
            border
            border-white/20
            rounded-3xl
            p-8
            shadow-2xl
            transition-all
            duration-500
            hover:bg-transparent
            hover:backdrop-blur-none
            hover:border-white/50
            hover:scale-105
            "
          >
            <FileText
              className="text-blue-400 mx-auto mb-4 group-hover:scale-110 transition"
              size={48}
            />

            <h3 className="text-xl font-bold text-white">
              Manage Schemes
            </h3>

            <p className="text-gray-300 mt-2 text-sm">
              Add, Edit & Delete Schemes
            </p>

          </button>

          

          <button
            onClick={() => navigate("/admin/users")}
            className="
            group
            relative
            overflow-hidden
            bg-white/5
            backdrop-blur-md
            border
            border-white/20
            rounded-3xl
            p-8
            shadow-2xl
            transition-all
            duration-500
            hover:bg-transparent
            hover:backdrop-blur-none
            hover:border-white/50
            hover:scale-105
            "
          >
            <Users
              className="text-green-400 mx-auto mb-4 group-hover:scale-110 transition"
              size={48}
            />

            <h3 className="text-xl font-bold text-white">
              Manage Users
            </h3>

            <p className="text-gray-300 mt-2 text-sm">
              View & Manage Users
            </p>

          </button>


          <button
            onClick={() => navigate("/admin/history")}
            className="
            group
            relative
            overflow-hidden
            bg-white/5
            backdrop-blur-md
            border
            border-white/20
            rounded-3xl
            p-8
            shadow-2xl
            transition-all
            duration-500
            hover:bg-transparent
            hover:backdrop-blur-none
            hover:border-white/50
            hover:scale-105
            "
          >
            <History
              className="text-orange-400 mx-auto mb-4 group-hover:scale-110 transition"
              size={48}
            />

            <h3 className="text-xl font-bold text-white">
              History
            </h3>

            <p className="text-gray-300 mt-2 text-sm">
              View Eligibility History
            </p>

          </button>



          <button
            onClick={() => navigate("/admin/reports")}
            className="
            group
            relative
            overflow-hidden
            bg-white/5
            backdrop-blur-md
            border
            border-white/20
            rounded-3xl
            p-8
            shadow-2xl
            transition-all
            duration-500
            hover:bg-transparent
            hover:backdrop-blur-none
            hover:border-white/50
            hover:scale-105
            "
          >
            <ArrowRight
              className="text-purple-400 mx-auto mb-4 group-hover:scale-110 transition"
              size={48}
            />

            <h3 className="text-xl font-bold text-white">
              Reports
            </h3>

            <p className="text-gray-300 mt-2 text-sm">
              Analytics & Reports
            </p>

          </button>

        </div>

      </div>

    </div>

  </div>

</div>

);
};

export default Admin;