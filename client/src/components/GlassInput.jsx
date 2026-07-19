const GlassInput = (props) => {
  return (
    <input
      {...props}
      className="
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
      "
    />
  );
};

export default GlassInput;