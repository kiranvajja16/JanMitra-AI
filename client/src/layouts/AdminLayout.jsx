import { Outlet } from "react-router-dom";
import gen63 from "../assets/gen63.jpg";

const AdminLayout = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${gen63})`,
      }}
    >
      <div className="min-h-screen bg-black/60">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;