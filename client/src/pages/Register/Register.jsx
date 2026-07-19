import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

import logo from "../../assets/logo.png";
import Vayu from "../../assets/Vayu.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful!");

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${Vayu})`,
      }}
    >
      <div className="min-h-screen bg-black/60 flex items-center justify-center p-6">

        <div
          className="
            w-full
            max-w-md
            bg-white/10
            backdrop-blur-2xl
            border
            border-white/20
            rounded-3xl
            shadow-2xl
            p-10
          "
        >

          <div className="flex flex-col items-center mb-8">

            <img
              src={logo}
              alt="JanMitra AI"
              className="w-24 h-24 object-contain mb-5"
            />

            <h1 className="text-5xl font-bold text-white">
              Create
              <span className="text-cyan-400">
                {" "}
                Account
              </span>
            </h1>

            <p className="text-gray-300 mt-3 text-center">
              Join JanMitra AI
            </p>

          </div>

          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-400/30 rounded-xl p-3 text-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
                        <div className="mb-5">
              <label className="block text-white font-semibold mb-3">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="
                  w-full
                  px-5
                  py-3
                  rounded-xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  text-white
                  placeholder-gray-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                  focus:border-cyan-400
                  transition-all
                "
              />
            </div>

            <div className="mb-5">
              <label className="block text-white font-semibold mb-3">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="
                  w-full
                  px-5
                  py-3
                  rounded-xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  text-white
                  placeholder-gray-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                  focus:border-cyan-400
                  transition-all
                "
              />
            </div>

            <div className="mb-5">
              <label className="block text-white font-semibold mb-3">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="
                  w-full
                  px-5
                  py-3
                  rounded-xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  text-white
                  placeholder-gray-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                  focus:border-cyan-400
                  transition-all
                "
              />
            </div>

            <div className="mb-8">
              <label className="block text-white font-semibold mb-3">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="
                  w-full
                  px-5
                  py-3
                  rounded-xl
                  bg-white/10
                  backdrop-blur-xl
                  border
                  border-white/20
                  text-white
                  placeholder-gray-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                  focus:border-cyan-400
                  transition-all
                "
              />
            </div>
                        <button
              type="submit"
              disabled={loading}
              className="
                w-full
                py-4
                rounded-xl
                bg-cyan-500/20
                border
                border-cyan-400/30
                backdrop-blur-xl
                text-white
                text-lg
                font-semibold
                hover:bg-cyan-500/40
                hover:scale-[1.02]
                transition-all
                duration-300
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <p className="text-center text-gray-300 mt-8">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition"
              >
                Login
              </Link>
            </p>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Register;