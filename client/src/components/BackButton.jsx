import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/admin")}
      className="flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800 font-medium"
    >
      <ArrowLeft size={18} />
      Back to Dashboard
    </button>
  );
};

export default BackButton;