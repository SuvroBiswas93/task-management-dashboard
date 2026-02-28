import { useState, useEffect } from "react";
import timeTrackerBg from "../../assets/timeTrackerBg.svg";

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
    <div className="relative overflow-hidden rounded-2xl p-4 text-white min-h-[208px]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#0b3a24]" />
      <img
        src={timeTrackerBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      />

      <h3 className="relative z-10 mb-3 text-sm font-medium text-white/90">Time Tracker</h3>

      <p className="relative z-10 mt-1 text-center font-light tracking-[0.02em] text-[50px] leading-none">
        {format(h)}:{format(m)}:{format(s)}
      </p>

      <div className="relative z-10 mt-6 flex items-center justify-center gap-2.5">
        <button
          onClick={() => setRunning(!running)}
          className="h-10 w-10 rounded-full bg-white/90 text-[#2d6a2d] transition-opacity hover:opacity-90 flex items-center justify-center cursor-pointer"
          aria-label={running ? "Pause timer" : "Resume timer"}
        >
          {running ? (
            <span className="flex items-center gap-1">
              <span className="h-3.5 w-[3.5px] rounded bg-[#2d6a2d]" />
              <span className="h-3.5 w-[3.5px] rounded bg-[#2d6a2d]" />
            </span>
          ) : (
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 1.5L12.5 8L2 14.5V1.5Z" fill="#2d6a2d" />
            </svg>
          )}
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          className="h-10 w-10 rounded-full bg-[#e8393a] transition-opacity hover:opacity-90 flex items-center justify-center cursor-pointer"
          aria-label="Stop timer"
        >
          <span className="h-3 w-3 rounded-[2px] bg-white" />
        </button>
      </div>
    </div>
  );
};

export default TimeTracker;