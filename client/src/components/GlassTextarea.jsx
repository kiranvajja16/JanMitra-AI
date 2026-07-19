const GlassTextarea = ({ className = "", ...props }) => {
  return (
    <textarea
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
        placeholder:text-gray-300
        focus:outline-none
        focus:border-blue-400
        ${className}
      `}
    />
  );
};

export default GlassTextarea;