import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="
        flex
        items-center
        gap-2
        px-5
        py-3
        rounded-xl
        bg-white/10
        backdrop-blur-md
        border
        border-white/20
        text-white
        hover:bg-transparent
        hover:border-blue-400
        transition-all
        duration-500
        mb-6
      "
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
};

export default BackButton;