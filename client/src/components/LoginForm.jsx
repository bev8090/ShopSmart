import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const {setUser} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {email, password}, {withCredentials: true});
      setUser(res.data.user);
      toast.success("Logged in successfully");
      navigate("/profile");
    } catch (error) {
      console.log("Error in logging in user.", error);
      toast.error("Incorrect email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-gray-900">
        <label className="label">
          <span className="label-text font-medium">Email Address</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input border border-black w-full bg-white backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="text-gray-900">
        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input border border-black bg-white w-full bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full bg-gradient-to-r from-primary to-primary-glow border-none text-primary-foreground font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
      >
        {isLoading ? (<span className="loading loading-spinner loading-sm"/>) : ('Sign In')}
      </button>
      <p className="text-center text-sm text-black">
        Don't have an account?{' '}
        <Link to="/register" className="link link-primary font-medium">
          Sign up here
        </Link>
      </p>
    </form>
  )
}

export default LoginForm;