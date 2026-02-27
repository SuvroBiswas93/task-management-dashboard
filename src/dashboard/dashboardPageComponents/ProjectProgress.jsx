import { motion } from "framer-motion";

const ProjectProgress = ({ data }) => {
    
  const completed = data?.completed || 45;
  const inProgress = data?.inProgress || 30;
  const pending = data?.pending || 25;
  const total = completed + inProgress + pending || 1;
  
  // Calculate percentage for the main progress (showing completed)
  const percentage = Math.round((completed / total) * 100) || 0;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300"
    >
      <h3 className="font-semibold text-gray-900 mb-6">Project Progress</h3>
      
      <div className="flex items-center gap-8">
        {/* Circular Progress */}
        <div className="relative w-35 h-35 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 140 140">
            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#e5e7eb" 
              strokeWidth="12"
            />
            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#166534" 
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
            <span className="text-xs text-gray-500">Project Ended</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#166534]" /> 
            <span className="text-sm text-gray-700">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#eab308]" /> 
            <span className="text-sm text-gray-700">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#6b7280]" /> 
            <span className="text-sm text-gray-700">Pending</span>
          </div>
        </div>
      </div>

      {(completed || inProgress || pending) && (
        <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Completed: {completed}</span>
            <span>In Progress: {inProgress}</span>
            <span>Pending: {pending}</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectProgress;