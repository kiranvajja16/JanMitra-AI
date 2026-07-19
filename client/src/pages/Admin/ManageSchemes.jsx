import { useEffect, useState } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../services/api";
import BackButton from "../../components/BackButton";

const ManageSchemes = () => {
  const navigate = useNavigate();

  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemes();
  }, []);

  useEffect(() => {
    const filtered = schemes.filter((scheme) => {
      const searchText = search.toLowerCase();

      return (
        scheme.schemeName.toLowerCase().includes(searchText) ||
        scheme.category.toLowerCase().includes(searchText) ||
        scheme.state.toLowerCase().includes(searchText)
      );
    });

    setFilteredSchemes(filtered);
  }, [search, schemes]);

  const fetchSchemes = async () => {
    try {
      const { data } = await api.get("/admin/schemes");

      setSchemes(data.schemes);
      setFilteredSchemes(data.schemes);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load schemes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scheme?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/schemes/${id}`);

      toast.success("Scheme deleted successfully");

      fetchSchemes();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete scheme");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <BackButton/>
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">

          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Manage Government Schemes
          </h1>

          <button
            onClick={() => navigate("/admin/add-scheme")}
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
            "
          >
            <Plus size={18} />
            Add Scheme
          </button>

        </div>

        <div className="relative mb-6">

          <Search
className="absolute left-4 top-3.5 text-white"
/>

          <input
            type="text"
            placeholder="Search schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              rounded-xl
              pl-11
              pr-4
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

        </div>

        <div className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        shadow-2xl
        overflow-hidden
        ">

          <table className="w-full">

            <thead className="bg-white/10 text-white backdrop-blur-md">

              <tr >

                <th className="text-left px-5 py-4">
                  Scheme
                </th>

                <th className="text-left px-5 py-4">
                  Category
                </th>

                <th className="text-left px-5 py-4">
                  State
                </th>

                <th className="text-left px-5 py-4">
                  Income Limit
                </th>

                <th className="text-center px-5 py-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSchemes.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-10 text-gray-500"
                  >
                    No Schemes Found
                  </td>
                </tr>
              ) : (
                filteredSchemes.map((scheme) => (
                  <tr
                    key={scheme._id}
                    className="
                    border-b
                    border-white/10
                    hover:bg-white/10
                    transition
                    duration-300
                    text-white
                    "
                  >
                    <td className="px-5 py-4 text-gray-200">
                      {scheme.schemeName}
                    </td>

                    <td className="px-5 py-4 text-gray-200">
                      {scheme.category}
                    </td>

                    <td className="px-5 py-4 text-gray-200">
                      {scheme.state}
                    </td>

                    <td className="px-5 py-4 text-gray-200">
                      ₹ {scheme.eligibility?.maxIncome || "N/A"}
                    </td>

                    <td className="px-5 py-4 text-gray-200">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            navigate(`/admin/edit-scheme/${scheme._id}`)
                          }
                          className="
                          bg-white/10
                          border
                          border-yellow-400/50
                          backdrop-blur-md
                          text-yellow-300
                          p-2
                          rounded-lg
                          hover:bg-transparent
                          hover:border-yellow-300
                          transition-all
                          duration-500
                          "
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(scheme._id)
                          }
                          className="
                          bg-white/10
                          border
                          border-red-500/50
                          backdrop-blur-md
                          text-red-400
                          p-2
                          rounded-lg
                          hover:bg-transparent
                          hover:border-red-400
                          transition-all
                          duration-500
                          "
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ManageSchemes;