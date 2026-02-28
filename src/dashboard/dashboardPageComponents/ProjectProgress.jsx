const ProjectProgress = () => {
  const percentage = 41;

  return (
    <div className="bg-white rounded-2xl p-5 h-full">
      <h3 className="font-semibold text-gray-900 mb-4">Project Progress</h3>

      <div className="flex flex-col items-center">
        <div className="relative w-64 h-40 shrink-0">
          <svg className="w-full h-full" viewBox="0 0 320 210">
            <defs>
              <pattern
                id="pendingPattern"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="6" stroke="#9ca3af" strokeWidth="2" />
              </pattern>
            </defs>

            <path
              d="M45 175 A115 115 0 0 1 275 175"
              fill="none"
              stroke="#e6e7ea"
              strokeWidth="26"
              strokeLinecap="round"
              pathLength="100"
            />

            <path
              d="M45 175 A115 115 0 0 1 275 175"
              fill="none"
              stroke="#4f8f5c"
              strokeWidth="26"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="70 30"
            />

            <path
              d="M45 175 A115 115 0 0 1 275 175"
              fill="none"
              stroke="#1f5f33"
              strokeWidth="26"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="14 86"
              strokeDashoffset="-66"
            />

            <path
              d="M45 175 A115 115 0 0 1 275 175"
              fill="none"
              stroke="url(#pendingPattern)"
              strokeWidth="26"
              strokeLinecap="butt"
              pathLength="100"
              strokeDasharray="16 84"
              strokeDashoffset="-84"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
            <span className="text-4xl font-semibold leading-none text-black">{percentage}%</span>
            <span className="text-xs text-emerald-700">Project Ended</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 -mt-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4F8F5C]" />
            <span className="text-xs text-emerald-700">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1F5F33]" />
            <span className="text-xs text-emerald-700">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6b7280]" />
            <span className="text-xs text-emerald-700">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;