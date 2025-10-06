import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const RegisterForm = () => {
  const {setUser} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(username.length < 3){
      toast.error("Username must be at least 3 characters long.");
      return;
    } else if(password.length < 8){
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const res = await axios.post("https://shopsmart-server-44g8.onrender.com/api/users/register", {username, email, password}, {withCredentials: true});
      setUser(res.data.user);
      toast.success("Your account has been created successfully.");

      navigate("/profile");
    } catch (error) {
      console.log("Error in registering user.", error);
      toast.error("Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-gray-900">
        <label className="label">
          <span className="label-text font-medium">Username</span>
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input border border-black w-full bg-white backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
          placeholder="Enter a username"
          required
        />
      </div>
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
          placeholder="Enter a password"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full bg-gradient-to-r from-primary to-primary-glow border-none text-primary-foreground font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
      >
        {isLoading ? (<span className="loading loading-spinner loading-sm"/>) : ('Create Account')}
      </button>
      <p className="text-center text-sm text-black">
        Already have an account?{' '}
        <Link to="/login" className="link link-primary font-medium">
          Sign in here
        </Link>
      </p>
    </form>
  )
}

export default RegisterForm;
