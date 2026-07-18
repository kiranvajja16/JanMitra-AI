import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
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
        <p className="text-center mt-10">Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        My Profile
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8">

        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {profile?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              {profile?.name}
            </h2>

            <p className="text-gray-500">
              {profile?.email}
            </p>

            <span className="inline-block mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {profile?.role}
            </span>
          </div>

        </div>

        <hr className="mb-8" />

        <h3 className="text-xl font-semibold mb-5">
          Account Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-gray-50 p-5 rounded-lg">
            <p className="text-gray-500">Full Name</p>
            <p className="font-semibold text-lg">
              {profile?.name}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg">
            <p className="text-gray-500">Email</p>
            <p className="font-semibold text-lg">
              {profile?.email}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg">
            <p className="text-gray-500">Role</p>
            <p className="font-semibold text-lg capitalize">
              {profile?.role}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-lg">
            <p className="text-gray-500">Joined On</p>
            <p className="font-semibold text-lg">
              {new Date(profile?.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        <h3 className="text-xl font-semibold mt-10 mb-5">
          My Activity
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-100 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-blue-700">
              {stats.totalChecks}
            </p>
            <p>Total Eligibility Checks</p>
          </div>

          <div className="bg-green-100 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-green-700">
              {stats.totalEligible}
            </p>
            <p>Eligible Schemes</p>
          </div>

          <div className="bg-yellow-100 rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-yellow-700">
              {stats.totalHistory}
            </p>
            <p>Recommendation History</p>
          </div>

        </div>

      </div>
    </MainLayout>
  );
};

export default Profile;