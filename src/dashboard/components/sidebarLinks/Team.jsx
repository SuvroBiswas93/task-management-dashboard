import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { api } from "../../../services/api";
import { Mail, Calendar } from "lucide-react";

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
  }, [token, setLoading]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-gray-900">Team</h1>
        <p className="text-sm text-gray-500 mt-1">View and manage your team members.</p>
      </motion.div>

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
              className="relative overflow-hidden rounded-2xl border border-[#e8efeb] bg-white hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="absolute -top-10 -right-8 w-28 h-28 rounded-full bg-emerald-100/50 blur-2xl pointer-events-none" />

              <div className="px-4 pt-4 pb-3 border-b border-[#edf2ef] bg-linear-to-br from-[#f4fbf7] via-[#f8fcfa] to-white">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-200 to-emerald-50 flex items-center justify-center text-emerald-800 text-sm font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                      {getInitials(user.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">Team Member</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize whitespace-nowrap ${
                      statusStyles[user.status] || statusStyles.inactive
                    }`}
                  >
                    {user.status || "inactive"}
                  </span>
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
                  <span>Joined {user.joinDate}</span>
                </div>
                <div className="pt-1 flex items-center justify-between text-[11px] text-gray-500">
                  <span>ID: #{user.id ?? "--"}</span>
                  <span className="text-emerald-700 font-medium">Assigned to active projects</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default Team;