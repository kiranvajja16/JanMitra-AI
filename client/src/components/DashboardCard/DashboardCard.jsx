const DashboardCard = ({ title, value, color }) => {
  return (
    <div
      className="
      bg-white/10
      backdrop-blur-xl
      border border-white/20
      rounded-3xl
      shadow-xl
      p-6
      hover:scale-105
      transition-all
      duration-300
    "
    >
      <h3 className="text-gray-300 text-sm uppercase tracking-wide">
        {title}
      </h3>

      <h1 className={`text-5xl font-bold mt-4 ${color}`}>
        {value}
      </h1>
    </div>
  );
};

export default DashboardCard;