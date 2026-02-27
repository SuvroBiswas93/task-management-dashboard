import { motion } from "framer-motion";
import { Pause, Play, Square } from "lucide-react";
import { useState, useEffect } from "react";

const TimeTracker = () => {
  const [seconds, setSeconds] = useState(5048);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const format = (n) => String(n).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.4 }}
      className="bg-blue-600 text-white rounded-2xl p-5 overflow-hidden relative"
    >
      {/* Decorative circles */}
      <div className="absolute -right-10 -bottom-10 w-[150px] h-[150px] rounded-full border-[20px] border-white/10" />
      <div className="absolute -right-5 -bottom-5 w-[100px] h-[100px] rounded-full border-[15px] border-white/5" />

      <h3 className="font-semibold text-sm mb-4 relative z-10">Time Tracker</h3>

      <p className="text-4xl font-extrabold tracking-wide relative z-10 font-mono">
        {format(h)}:{format(m)}:{format(s)}
      </p>

      <div className="flex items-center gap-3 mt-4 relative z-10">

        {/* Pause / Resume Toggle */}
        <button
          onClick={() => setRunning(!running)}
          className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          {running ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        {/* Stop Button */}
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
        >
          <Square className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default TimeTracker;