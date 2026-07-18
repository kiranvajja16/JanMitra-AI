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
    <aside className="w-64 min-h-screen bg-white shadow-md">
      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-4 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition ${
                isActive ? "bg-blue-100 text-blue-700 font-semibold" : ""
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;