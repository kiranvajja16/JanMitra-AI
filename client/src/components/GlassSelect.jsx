const GlassSelect = ({ children, className = "", ...props }) => {
  return (
    <select
      {...props}
      className={`
        w-full
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-xl
        px-4
        py-3
        text-white
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400
        focus:border-cyan-400
        transition-all
        ${className}
      `}
    >
      {children}
    </select>
  );
};

export default GlassSelect;