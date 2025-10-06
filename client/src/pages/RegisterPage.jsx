import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 h-screen pt-24">
        <div className="w-full max-w-md">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-black bg-white p-8 lg:p-10">
            <div className="text-center mb-8 text-black">
              <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
              <p className="text-muted-foreground text-sm">Register an account with us for a better experience</p>
            </div>
            <RegisterForm/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage;