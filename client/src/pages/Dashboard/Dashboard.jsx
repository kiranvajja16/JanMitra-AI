import MainLayout from "../../layouts/MainLayout";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

const Dashboard = () => {
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
          value="0"
          color="text-blue-600"
        />

        <DashboardCard
          title="Eligible Schemes"
          value="0"
          color="text-green-600"
        />

        <DashboardCard
          title="History"
          value="0"
          color="text-purple-600"
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;