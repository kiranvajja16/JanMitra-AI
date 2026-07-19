import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaUser,
} from "react-icons/fa";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Check Eligibility",
      path: "/eligibility",
      icon: <FaClipboardList />,
    },
    {
      name: "History",
      path: "/history",
      icon: <FaHistory />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10">
      <nav className="mt-8 px-4 space-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                backdrop-blur-xl
                border
                transition-all
                duration-300
                shadow-lg
                ${
                  isActive
                    ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300"
                    : "bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-cyan-300/30 hover:text-cyan-200"
                }
              `
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;