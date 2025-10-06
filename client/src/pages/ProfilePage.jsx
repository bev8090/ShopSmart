import { useContext } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import OrderHistory from "../components/OrderHistory";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="text-black font-serif pt-22">
        <ProfileHeader user={user} />
        {user.isAdmin && (
          <div className="flex flex-col mt-5">
            <div className="flex space-x-2">
              <p className="text-black text-2xl">Enter the Admin Panel?</p>
              <Link to={"/admin"} className="flex text-xl items-center justify-center btn btn-primary">
                <span>Go to Admin Panel</span>
                <ArrowRight className="size-6" />
              </Link>
            </div>
          </div>
        )}
        <OrderHistory className="border-t border-black" />
        <div className="flex flex-col gap-2 my-5">
          <h2 className="text-black text-xl">Check up on other products</h2>
          <Link to={"/"}>
            <button className="btn btn-primary">To Home Page</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;