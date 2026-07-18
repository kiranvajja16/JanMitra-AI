import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Users,
  FileText,
  History,
  Star,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

import api from "../../services/api";
import StatsCard from "../../components/StatsCard";

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#F97316",
  "#DC2626",
  "#7C3AED",
  "#0891B2",
];

const Reports = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({});

  const [categoryData, setCategoryData] = useState([]);

  const [stateData, setStateData] = useState([]);

  const [topSchemes, setTopSchemes] = useState([]);

  const [recentHistory, setRecentHistory] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await api.get("/admin/reports");

      setStats(data.stats);

      setCategoryData(data.categoryData);

      setStateData(data.stateData);

      setTopSchemes(data.topSchemes);

      setRecentHistory(data.recentHistory);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load reports");
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

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Reports & Analytics
        </h1>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <StatsCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<Users className="text-white" />}
            color="bg-blue-600"
          />

          <StatsCard
            title="Total Schemes"
            value={stats.totalSchemes}
            icon={<FileText className="text-white" />}
            color="bg-green-600"
          />

          <StatsCard
            title="Recommendations"
            value={stats.totalHistory}
            icon={<History className="text-white" />}
            color="bg-orange-500"
          />

          <StatsCard
            title="Average Eligible"
            value={stats.averageEligible}
            icon={<Star className="text-white" />}
            color="bg-purple-600"
          />

        </div>

        {/* Charts */}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Scheme Categories
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >

                  {categoryData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[index % COLORS.length]
                      }
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              State Wise Users
            </h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <BarChart data={stateData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="state" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="users"
                  fill="#2563EB"
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>
                {/* Top Recommended Schemes */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl font-bold mb-5">
            Top 5 Recommended Schemes
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={topSchemes}
              layout="vertical"
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" />

              <YAxis
                dataKey="name"
                type="category"
                width={180}
              />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="count"
                fill="#16A34A"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Recent Activity */}

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold mb-5">
            Recent Activity
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="text-left px-4 py-3">
                    User
                  </th>

                  <th className="text-left px-4 py-3">
                    Email
                  </th>

                  <th className="text-left px-4 py-3">
                    Eligible Schemes
                  </th>

                  <th className="text-left px-4 py-3">
                    Checked On
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentHistory.length === 0 ? (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No Recent Activity
                    </td>

                  </tr>

                ) : (

                  recentHistory.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="px-4 py-4 font-semibold">
                        {item.user?.name || "Unknown User"}
                      </td>

                      <td className="px-4 py-4">
                        {item.user?.email || "N/A"}
                      </td>

                      <td className="px-4 py-4">
                        {item.eligibleSchemes?.length || 0}
                      </td>

                      <td className="px-4 py-4">
                        {new Date(
                          item.createdAt
                        ).toLocaleString()}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Reports;