import { useEffect, useState, useCallback } from "react";
import MainLayout from "../../layouts/MainLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";
import { Link } from "react-router-dom";
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
      <div className="space-y-10">

        <GlassCard className="p-8 md:p-10">
          <div className="max-w-4xl">

            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Welcome to{" "}
                <span className="text-cyan-400">JanMitra AI</span>
              </h1>

              <p className="text-gray-300 text-lg mt-6 leading-8">
                Discover government schemes tailored specifically to your
                eligibility using AI-powered recommendations. Save time and
                never miss a benefit you're entitled to.
              </p>

              <div className="mt-8">
              <Link to="/eligibility">
                <GlassButton>
                  Check Eligibility
                </GlassButton>
              </Link>
            </div>
            </div>

            
          </div>
        </GlassCard>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DashboardCard
            title="Recommendations"
            value={stats.totalChecks}
            color="bg-blue-500/30 text-blue-300"
          />

          <DashboardCard
            title="Eligible Schemes"
            value={stats.totalEligible}
            color="bg-green-500/30 text-green-300"
          />

          <DashboardCard
            title="History"
            value={stats.totalHistory}
            color="bg-purple-500/30 text-purple-300"
          />
        </div>

        {/* How It Works */}
        <GlassCard className="p-8">
          <h2 className="text-3xl font-bold text-white mb-8">
            How JanMitra AI Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-white">
                Fill Your Profile
              </h3>
              <p className="text-gray-300 mt-3">
                Enter your personal and financial details securely.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white">
                AI Analysis
              </h3>
              <p className="text-gray-300 mt-3">
                Our AI evaluates your eligibility across multiple government
                schemes.
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white">
                Get Recommendations
              </h3>
              <p className="text-gray-300 mt-3">
                Instantly receive the schemes you qualify for with complete
                details.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </MainLayout>
  );
};

export default Dashboard;