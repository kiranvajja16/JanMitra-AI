import { useEffect, useState } from "react";
import { Search, Trash2, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import BackButton from "../../components/BackButton";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";
import GlassInput from "../../components/GlassInput";
import PageTitle from "../../components/PageTitle";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");

      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, role) => {
    if (role === "admin") {
      toast.error("Admin account cannot be deleted.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/users/${id}`);

      toast.success("User deleted successfully");

      fetchUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold">Loading users...</h2>
      </div>
    );
  }

  return (
  <div className="min-h-screen">
    <BackButton />

    <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-8">

      <div className="flex items-center gap-4">
        <Users className="text-cyan-400" size={40} />

        <PageTitle
          title="Manage Users"
          subtitle="View and manage registered users"
        />
      </div>

      <div className="relative w-full md:w-80">

        <Search
          size={20}
          className="absolute left-4 top-3.5 text-white"
        />

        <GlassInput
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12"
        />

      </div>

    </div>

    <GlassCard className="overflow-hidden">

      <table className="w-full text-white">

        <thead className="bg-white/10 backdrop-blur-md">

          <tr>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Role
            </th>

            <th className="px-6 py-4 text-left">
              Joined
            </th>

            <th className="px-6 py-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredUsers.length === 0 ? (

            <tr>

              <td
                colSpan="5"
                className="py-10 text-center text-gray-300"
              >
                No users found.
              </td>

            </tr>

          ) : (

            filteredUsers.map((user) => (

              <tr
                key={user._id}
                className="border-b border-white/10 hover:bg-white/10 transition"
              >

                <td className="px-6 py-5 font-semibold">
                  {user.name}
                </td>

                <td className="px-6 py-5 text-gray-300">
                  {user.email}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      user.role === "admin"
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-green-500/20 text-green-300 border border-green-500/30"
                    }`}
                  >
                    {user.role}
                  </span>

                </td>

                <td className="px-6 py-5 text-gray-300">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-5 text-center">

                  <GlassButton
                    onClick={() =>
                      handleDelete(user._id, user.role)
                    }
                    disabled={user.role === "admin"}
                    className={`p-2 ${
                      user.role === "admin"
                        ? "opacity-40 cursor-not-allowed"
                        : "border-red-500 text-red-400 hover:border-red-400"
                    }`}
                  >
                    <Trash2 size={18} />
                  </GlassButton>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </GlassCard>

  </div>
);
};

export default ManageUsers;