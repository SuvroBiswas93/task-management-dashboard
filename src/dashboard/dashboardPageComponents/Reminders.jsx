import { motion } from "framer-motion";
import { Video } from "lucide-react";

const Reminders = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300"
    >
      <h3 className="font-semibold text-gray-900 mb-4">Reminders</h3>

      <div className="">
        <p className="font-semibold text-green-800 text-lg">
          Meeting with Arc Company
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Time : 02.00 pm - 04.00 pm
        </p>
        <button className="mt-3 flex items-center gap-2 bg-linear-to-r cursor-pointer from-emerald-900 to-emerald-700 text-white px-4 py-2 rounded-3xl text-sm font-medium hover:opacity-90 transition-opacity">
          <Video className="w-4 h-4" />
          Start Meeting
        </button>
      </div>
    </motion.div>
  );
};

export default Reminders;