import React from "react";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-gray-500 text-sm font-medium">{title}</h4>

          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>

        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;