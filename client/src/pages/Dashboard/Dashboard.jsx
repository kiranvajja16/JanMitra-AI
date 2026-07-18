import { useEffect, useState ,useCallback} from "react";
import MainLayout from "../../layouts/MainLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { getDashboardStats } from "../../services/dashboardService";
const Dashboard = () => {
  const [stats, setStats] = useState({
  totalChecks: 0,
  totalEligible: 0,
  totalHistory: 0,
});



const fetchStats = useCallback(async () => {
  try {
    const data = await getDashboardStats();

    setStats({
      totalChecks: data.totalChecks,
      totalEligible: data.totalEligible,
      totalHistory: data.totalHistory,
    });
  } catch (err) {
    console.error(err);
  }
}, []);

useEffect(() => {
  fetchStats();
}, [fetchStats]);

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to JanMitra AI 
      </h1>

      <p className="text-gray-500 mt-2">
        Find government schemes tailored to your eligibility.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <DashboardCard
  title="Recommendations"
  value={stats.totalChecks}
  color="text-blue-600"
/>

<DashboardCard
  title="Eligible Schemes"
  value={stats.totalEligible}
  color="text-green-600"
/>

<DashboardCard
  title="History"
  value={stats.totalHistory}
  color="text-purple-600"
/>
      </div>
    </MainLayout>
  );
};

export default Dashboard;