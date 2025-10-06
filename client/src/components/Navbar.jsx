import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { LogIn, LogOut } from "lucide-react";
import { User } from 'lucide-react';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post("https://shopsmart-server-44g8.onrender.com/api/users/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Failed to log out", error);
      toast.error("Failed to log out");
    }
  }

  let cartItems = 0;
  const getCartItems = () => {
    const storedCartData = localStorage.getItem("cart");

    if (storedCartData) {
      const cartData = JSON.parse(storedCartData);
      cartItems = cartData.length;
    }
    return cartItems;
  }

  return (
    <nav className="flex fixed z-10 max-w-full sm:min-w-full items-center justify-between p-4 border-b-1 border-white max-h-18 bg-gradient-to-b from-white to-gray-50 opacity-90">
      <div className="flex items-center gap-2 max-w-1/3">
        <Link to={"/"}>
          <div className='flex items-center justify-center gap-4'>
            <img src="https://democracylab-marlok.s3.amazonaws.com/thumbnails%2Fs.mathe3107%40gmail.com%2FnewFile.jpeg_1712584408.9970863.jpeg" alt="Shopsmart Logo" className='size-18' />
            <h1 className="hidden md:block md:text-2xl lg:text-3xl font-bold text-blue-400 font-mono tracking-tight">Shopsmart</h1>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-1 max-w-1/3">
        <Link to={"/profile"} className="btn btn-ghost text-black hover:bg-gray-300 border-0">
          <User className="size-5" />
          <span>Profile</span>
        </Link>
        <Link to={"/checkout"} className="btn btn-ghost text-black hover:bg-gray-300 border-0">
          <ShoppingCart className="size-5" />
          <span>Checkout</span>
          {user && getCartItems() > 0 && (
            <div className='border-1 bg-red-500 border-black text-white rounded-2xl size-4.5'>
              {getCartItems()}
            </div>
          )}
        </Link>
      </div>
      <div className="flex items-center gap-4 max-w-1/3 ">
        {user ? (
          <button className="btn btn-primary" onClick={handleLogout}>
            <LogOut className="size-5" />
            <span>Log Out</span>
          </button>
        ) : (
          <Link to={"/login"} className="btn btn-primary">
            <LogIn className="size-5" />
            <span>Log In</span>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar;
