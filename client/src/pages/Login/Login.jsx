import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

const Login = ()=>{
    const navigate=useNavigate();
    const {login}=useAuth();
    const [formData,setFormData]=useState({
        email:"",
        password:"",
    });

    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();

        console.log("Login button clicked");
        setLoading(true);
        setError("");
        try{
            const data= await login(formData);
            if(data.user.role === "admin"){
                navigate("/admin");
            }else{
                navigate("/dashboard");
            }
        }
       catch (err) {
        console.log(err);
        console.log(err.response);
        console.log(err.response?.data);

        setError(err.response?.data?.message || "Login failed");
      }
        setLoading(false);
        console.log(formData);
    };

   return (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-10 rounded-2xl shadow-xl"
    >
      <div className="flex flex-col items-center mb-8">
      <img
        src={logo}
        alt="JanMitra AI Logo"
        className="w-24 h-24 mb-3"
      />

      <h1 className="text-4xl font-bold text-blue-700">
        JanMitra AI
      </h1>

      <p className="text-gray-500 text-center mt-2">
        Government Scheme Recommendation System
      </p>
  </div>

      {error && (
        <p className="mb-4 text-center text-red-500">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p className="text-center mt-6">
  Don't have an account?{" "}
  <Link
    to="/register"
    className="text-blue-600 font-semibold hover:underline"
  >
    Register
  </Link>
</p>
    </form>
    
  </div>
);

};

export default Login;