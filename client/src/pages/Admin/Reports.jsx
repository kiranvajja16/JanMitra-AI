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

import BackButton from "../../components/BackButton";
import StatsCard from "../../components/StatsCard";
import GlassCard from "../../components/GlassCard";
import PageTitle from "../../components/PageTitle";
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
      <div className="min-h-screen flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
  <div className="min-h-screen">

    <BackButton />

    <div className="max-w-7xl mx-auto">

      <PageTitle
        title="Reports & Analytics"
        subtitle="Overall insights and statistics of JanMitra AI"
      />

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

      <div className="grid lg:grid-cols-2 gap-8 mb-8">

        <GlassCard className="p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
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
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                }}
                labelStyle={{ color: "#fff" }}
              />

            </PieChart>

          </ResponsiveContainer>

        </GlassCard>

        <GlassCard className="p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            State Wise Users
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <BarChart data={stateData}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.15)"
              />

              <XAxis
                dataKey="state"
                stroke="#ffffff"
              />

              <YAxis
                stroke="#ffffff"
              />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="users"
                fill="#38bdf8"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </GlassCard>

      </div>



      <GlassCard className="p-6 mb-8">

        <h2 className="text-2xl font-bold text-white mb-6">
          Top 5 Recommended Schemes
        </h2>

        <ResponsiveContainer
          width="100%"
          height={360}
        >

          <BarChart
            data={topSchemes}
            layout="vertical"
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.15)"
            />

            <XAxis
              type="number"
              stroke="#ffffff"
            />

            <YAxis
              dataKey="name"
              type="category"
              width={190}
              stroke="#ffffff"
            />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              fill="#22c55e"
              radius={[0, 8, 8, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </GlassCard>

            {/* Recent Activity */}

      <GlassCard className="p-6">

        <h2 className="text-2xl font-bold text-white mb-6">
          Recent Activity
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-white">

            <thead className="bg-white/10 backdrop-blur-md">

              <tr>

                <th className="text-left px-5 py-4">
                  User
                </th>

                <th className="text-left px-5 py-4">
                  Email
                </th>

                <th className="text-left px-5 py-4">
                  Eligible Schemes
                </th>

                <th className="text-left px-5 py-4">
                  Checked On
                </th>

              </tr>

            </thead>

            <tbody>

              {recentHistory.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-300"
                  >
                    No Recent Activity
                  </td>

                </tr>

              ) : (

                recentHistory.map((item) => (

                  <tr
                    key={item._id}
                    className="
                      border-b
                      border-white/10
                      hover:bg-white/5
                      transition
                    "
                  >

                    <td className="px-5 py-4 font-semibold">
                      {item.user?.name || "Unknown User"}
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {item.user?.email || "N/A"}
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {item.eligibleSchemes?.length || 0}
                    </td>

                    <td className="px-5 py-4 text-gray-300">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

            </GlassCard>

    </div>

  </div>
);
};


export default Reports;