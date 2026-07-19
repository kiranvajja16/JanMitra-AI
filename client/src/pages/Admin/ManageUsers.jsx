import { useEffect, useState } from "react";
import { Search, Trash2, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import BackButton from "../../components/BackButton";

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
    <div className="min-h-screen bg-slate-100 p-8">
      <BackButton />

      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-3">

          <Users className="text-blue-600" size={35} />

          <h1 className="text-4xl font-bold text-blue-700">
            Manage Users
          </h1>

        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border w-72"
          />

        </div>

      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="min-w-full">

          <thead className="bg-blue-600 text-white">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Joined</th>

              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (
              <tr>

                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500"
                >
                  No users found.
                </td>

              </tr>
            ) : (
              filteredUsers.map((user) => (

                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>

                  <td className="p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() =>
                        handleDelete(user._id, user.role)
                      }
                      disabled={user.role === "admin"}
                      className={`px-4 py-2 rounded-lg text-white ${
                        user.role === "admin"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ManageUsers;