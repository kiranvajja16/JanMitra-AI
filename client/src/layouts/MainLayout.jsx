import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import bob from "../assets/bob.jpg";

const MainLayout = ({ children }) => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${bob})`,
      }}
    >
      <div className="min-h-screen bg-black/60">
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;