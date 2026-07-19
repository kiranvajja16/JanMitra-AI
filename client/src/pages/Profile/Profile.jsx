import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import GlassCard from "../../components/GlassCard";
import api from "../../services/api";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const [stats, setStats] = useState({
    totalChecks: 0,
    totalEligible: 0,
    totalHistory: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, statsRes] = await Promise.all([
          api.get("/auth/profile"),
          api.get("/history/stats"),
        ]);

        setProfile(profileRes.data.user);
        setStats(statsRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center text-white text-xl mt-20">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-white mb-10">
          My <span className="text-cyan-400">Profile</span>
        </h1>

        <GlassCard className="p-8">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-4xl font-bold text-white shadow-xl">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>

            <div>

              <h2 className="text-4xl font-bold text-white">
                {profile?.name}
              </h2>

              <p className="text-gray-300 mt-2">
                {profile?.email}
              </p>

              <span className="inline-block mt-4 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 capitalize">
                {profile?.role}
              </span>

            </div>

          </div>

          <div className="border-t border-white/20 my-10"></div>

          <h2 className="text-3xl font-bold text-white mb-6">
            Account Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <GlassCard className="p-6">
              <p className="text-gray-400">Full Name</p>
              <p className="text-white text-xl font-semibold mt-2">
                {profile?.name}
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-gray-400">Email</p>
              <p className="text-white text-xl font-semibold mt-2">
                {profile?.email}
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-gray-400">Role</p>
              <p className="text-white text-xl font-semibold mt-2 capitalize">
                {profile?.role}
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-gray-400">Joined On</p>
              <p className="text-white text-xl font-semibold mt-2">
                {new Date(profile?.createdAt).toLocaleDateString()}
              </p>
            </GlassCard>

          </div>

          <h2 className="text-3xl font-bold text-white mt-12 mb-6">
            My Activity
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <GlassCard className="p-8 text-center">

              <h3 className="text-gray-300 uppercase tracking-wide">
                Eligibility Checks
              </h3>

              <p className="text-5xl font-bold text-cyan-400 mt-4">
                {stats.totalChecks}
              </p>

            </GlassCard>

            <GlassCard className="p-8 text-center">

              <h3 className="text-gray-300 uppercase tracking-wide">
                Eligible Schemes
              </h3>

              <p className="text-5xl font-bold text-green-400 mt-4">
                {stats.totalEligible}
              </p>

            </GlassCard>

            <GlassCard className="p-8 text-center">

              <h3 className="text-gray-300 uppercase tracking-wide">
                History
              </h3>

              <p className="text-5xl font-bold text-yellow-400 mt-4">
                {stats.totalHistory}
              </p>

            </GlassCard>

          </div>

        </GlassCard>

      </div>
    </MainLayout>
  );
};

export default Profile;