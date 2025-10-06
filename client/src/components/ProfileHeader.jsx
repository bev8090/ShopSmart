import { User } from "lucide-react";

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      <User className="w-32 h-32 rounded-full border-4 border-blue-500" />
      <div className="text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-600">User Id: {user.userId}</p>
      </div>
    </div>
  )
}

export default ProfileHeader;