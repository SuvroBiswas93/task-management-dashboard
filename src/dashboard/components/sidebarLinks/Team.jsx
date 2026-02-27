import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { api } from "../../../services/api";
import { Mail, Calendar } from "lucide-react";

const statusStyles = {
  active: "text-emerald-600 bg-emerald-100",
  inactive: "text-gray-500 bg-gray-200",
};

const Team = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const token = user?.token;

  const [users, setUsers] = useState([]);


  useEffect(() => {
    if (!token) return;

    api
      .getUsers()
      .then((data) => {
        const formatted = Array.isArray(data) ? data : data?.users || [];
        setUsers(formatted);
      })
      .finally(() => setLoading(false));
  }, [token,setLoading]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 px-6 pb-6 overflow-auto">
        <TopBar />

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900">Team</h1>
          <p className="text-sm text-gray-500">
            View and manage your team members.
          </p>
        </motion.div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, i) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {user.name?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name}
                    </p>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                        statusStyles[user.status] || statusStyles.inactive
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Joined {user.joinDate}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Team;