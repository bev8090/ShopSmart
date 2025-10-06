import { Link } from "react-router";
import { PenBox, Plus } from "lucide-react";
import Navbar from "../components/Navbar";

const AdminPanel = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
        <h1 className="font-bold text-black text-2xl font-mono">Welcome to the Admin Panel!</h1>
        <p className="text-black text-lg font-sans">Create, Update, and Delete product information here.</p>
        <div className="flex items-center justify-center gap-2">
          <Link to={"/admin/create"} className="card bg-gradient-to-b from-cyan-400 to-primary hover:shadow-lg border-2">
            <div className="card-body">
              <div className="flex items-center justify-center">
                <h3 className="card-title text-white">Create New Product</h3>
                <Plus className="size-6 ml-2" />
              </div>
            </div>
          </Link>
          <Link to={"/admin/modify"} className="card bg-gradient-to-b from-cyan-400 to-primary hover:shadow-lg border-2">
            <div className="card-body">
              <div className="flex items-center justify-center">
                <h3 className="card-title text-white">Modify Existing Product</h3>
                <PenBox className="size-6 ml-2" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel;