const GlassButton = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
            px-5
            py-3
            rounded-xl
            bg-white/10
            backdrop-blur-md
            border
            border-white/20
            text-white
            hover:bg-transparent
            transition-all
            duration-500
            ${className}
        `}
        >
      {children}
    </button>
  );
};

export default GlassButton;