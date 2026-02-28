import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { api } from "../../../services/api";
import { Mail, Calendar, MoreHorizontal } from "lucide-react";

const statusStyles = {
  active: "text-[#4f8f5c] bg-[#edf8f2] border border-[#cfe9db]",
  inactive: "text-[#7b8599] bg-[#f1f4f8] border border-[#dce3ec]",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const Team = () => {
  const navigate = useNavigate();
  const { user, loading} = useContext(AuthContext);
  const token = user?.token;

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        const formatted = Array.isArray(data) ? data : data?.users || [];
        setUsers(formatted);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch users");
        console.error("Error fetching users:", err);
      } 
    };

    fetchUsers();
  }, [token]);

  const handleUserClick = (userId) => {
    navigate(`/dashboard/team/${userId}`);
  };

  const handleMoreOptions = (e, userId) => {
    e.stopPropagation();
    console.log("More options for user:", userId);
    
  };

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 text-center border border-gray-100"
      >
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  if (users.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 text-center border border-gray-100"
      >
        <p className="text-gray-500">No team members found</p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Team</h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage your team members ({users.length} total)
          </p>
        </div>
        
        {/* Optional: Add filter buttons */}
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors">
            Active ({users.filter(u => u.status === 'active').length})
          </button>
          <button className="px-3 py-1.5 text-sm bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
            Inactive ({users.filter(u => u.status === 'inactive').length})
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => handleUserClick(user.id)}
            className="relative overflow-hidden rounded-2xl border border-[#e8efeb] bg-white hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="absolute -top-10 -right-8 w-28 h-28 rounded-full bg-emerald-100/50 blur-2xl pointer-events-none" />

            <div className="px-4 pt-4 pb-3 border-b border-[#edf2ef] bg-linear-to-br from-[#f4fbf7] via-[#f8fcfa] to-white">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-200 to-emerald-50 flex items-center justify-center text-emerald-800 text-sm font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    {getInitials(user.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-emerald-700 transition-colors">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">Team Member</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize whitespace-nowrap ${
                      statusStyles[user.status] || statusStyles.inactive
                    }`}
                  >
                    {user.status || "inactive"}
                  </span>
                  <button
                    onClick={(e) => handleMoreOptions(e, user.id)}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-gray-600 bg-[#f8faf9] rounded-xl px-3 py-2.5 border border-[#edf2ef]">
                <div className="w-6 h-6 rounded-lg bg-white border border-[#e4ebe7] flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-gray-600 bg-[#f8faf9] rounded-xl px-3 py-2.5 border border-[#edf2ef]">
                <div className="w-6 h-6 rounded-lg bg-white border border-[#e4ebe7] flex items-center justify-center shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                </div>
                <span>Joined {formatJoinDate(user.joinDate)}</span>
              </div>
              <div className="pt-1 flex items-center justify-between text-[11px] text-gray-500">
                <span>ID: #{user.id ?? "--"}</span>
                <span className="text-emerald-700 font-medium">
                  {user.status === 'active' ? 'Active' : 'Inactive'} member
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Team;