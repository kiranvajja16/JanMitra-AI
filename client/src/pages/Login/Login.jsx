import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import logo from "../../assets/logo.png";
import Vayu from "../../assets/Vayu.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    setLoading(true);
    setError("");

    try {
      const data = await login(formData);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);

      setError(
        err.response?.data?.message || "Login failed"
      );
    }

    setLoading(false);
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
              JanMitra
              <span className="text-cyan-400">
                {" "}
                AI
              </span>
            </h1>

            <p className="text-gray-300 mt-3 text-center">
              Government Scheme Recommendation System
            </p>

          </div>

          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-400/30 rounded-xl p-3 text-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
                        <div className="mb-6">
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

            <div className="mb-8">
              <label className="block text-white font-semibold mb-3">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-300 mt-8">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-cyan-400 font-semibold hover:text-cyan-300 transition"
              >
                Register
              </Link>
            </p>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Login;