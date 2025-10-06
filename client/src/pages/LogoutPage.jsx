import axios from "axios";
import { Home, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const LogoutPage = () => {
  const [success, setSuccess] = useState(false);

  const logOut = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout",{}, {withCredentials: true});
      setSuccess(true);
    } catch (error) {
      console.log("Error with logout", error);
      setSuccess(false);
    }  
  }
  logOut();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {success ? (
        <>
          <h1 className="text-black">Logged Out Successfully!</h1>
          <div className="flex items-center gap-2.5">
            <Link to={"/"} className="btn btn-primary">
              <Home className="size-5"/>
              <span>To Home Page</span>
            </Link>
            <Link to={"/login"} className="btn btn-primary">          
              <span>Log In</span>
              <LogIn className="size-5"/>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-black">Failed to Log Out</h1>
          <div className="flex items-center gap-2.5">
            <Link to={"/"} className="btn btn-primary">
              <Home className="size-5"/>
              <span>To Home Page</span>
            </Link>
            <Link to={"/logout"} className="btn btn-primary">          
              <span>Retry Logout</span>
              <LogOut className="size-5"/>
            </Link>
          </div>
        </> 
      )}
    </div>
  )
}

export default LogoutPage;