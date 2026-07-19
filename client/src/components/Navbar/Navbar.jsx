import { FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-xl">
      <div className="px-8 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Jan<span className="text-cyan-400">Mitra AI</span>
        </h1>

        <div className="flex items-center gap-6">
          <span className="hidden md:block text-gray-200">
            Welcome,{" "}
            <span className="font-semibold text-cyan-300">
              {user?.name || "User"}
            </span>
          </span>

          <button
            onClick={handleLogout}
            className="
              flex
              items-center
              gap-2
              px-5
              py-2.5
              rounded-xl
              bg-red-500/20
              border
              border-red-400/30
              text-white
              hover:bg-red-500/40
              transition-all
            "
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;