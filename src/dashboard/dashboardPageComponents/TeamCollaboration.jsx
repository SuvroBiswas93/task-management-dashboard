import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const statusColors = {
  active: "text-green-500 bg-green-500/10",
  inactive: "text-gray-500 bg-gray-200",
};

const colorMap = [
  "bg-emerald-800",
  "bg-yellow-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-red-500"
];

const TeamCollaboration = ({ data }) => {
  const users = data?.users || [];

  if (users.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Team Collaboration</h3>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-800/10 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Add Member
        </button>
      </div>

      <div className="space-y-3">
        {users.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.06 }}
            className="flex items-center gap-3"
          >
            {/* Circle with different colors */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${colorMap[i % colorMap.length]}`}
            >
              {user.name.charAt(0)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>

            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                statusColors[user.status] || "text-gray-500 bg-gray-200"
              }`}
            >
              {user.status}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamCollaboration;