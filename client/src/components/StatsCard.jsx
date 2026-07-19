const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div
      className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        p-6
        shadow-2xl
        hover:bg-white/15
        hover:scale-[1.03]
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <h4 className="text-gray-300 text-sm font-medium uppercase tracking-wide">
            {title}
          </h4>

          <p className="text-4xl font-bold text-white mt-3">
            {value}
          </p>

        </div>

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            shadow-lg
            ${color}
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
};

export default StatsCard;