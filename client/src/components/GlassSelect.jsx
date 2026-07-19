const GlassSelect = ({ className = "", children, ...props }) => {
  return (
    <select
      {...props}
      className={`
        w-full
        rounded-xl
        px-4
        py-3
        bg-white/10
        backdrop-blur-md
        border
        border-white/20
        text-white
        focus:outline-none
        focus:border-blue-400
        ${className}
      `}
    >
      {children}
    </select>
  );
};

export default GlassSelect;