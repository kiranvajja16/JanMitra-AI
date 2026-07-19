const GlassButton = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`
        px-6
        py-3
        rounded-xl
        bg-white/10
        backdrop-blur-md
        border border-white/20
        text-white
        hover:bg-cyan-500/20
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default GlassButton;