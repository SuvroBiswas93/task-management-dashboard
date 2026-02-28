const ProjectAnalytics = () => {
  const bars = [
    { day: "S", height: 72, style: "striped" },
    { day: "M", height: 86, style: "solid" },
    { day: "T", height: 76, style: "light", label: "74%" },
    { day: "W", height: 96, style: "solidDark" },
    { day: "T", height: 88, style: "striped" },
    { day: "F", height: 74, style: "striped" },
    { day: "S", height: 86, style: "striped" },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-base">Project Analytics</h3>
      </div>

      <div className="pt-1 flex-1 flex flex-col justify-end">
        <div className="h-[128px] flex items-end justify-center gap-3">
          {bars.map((bar, i) => {
            const barClass =
              bar.style === "solidDark"
                ? "bg-emerald-900"
                : bar.style === "solid"
                  ? "bg-emerald-700"
                  : bar.style === "light"
                    ? "bg-emerald-400"
                    : "bg-[#f6f9f8] bg-[repeating-linear-gradient(-45deg,rgba(95,125,115,0.58),rgba(95,125,115,0.58)_3px,transparent_3px,transparent_8px)]";

            return (
              <div key={`${bar.day}-${i}`} className="relative flex flex-col items-center justify-end">
                {bar.label && (
                  <>
                    <span className="absolute -top-7 text-[10px] text-emerald-700 font-medium px-1.5 py-0.5 rounded-md bg-[#f2f3f2] border border-[#dfe3e1] leading-none">
                      {bar.label}
                    </span>
                    <span className="absolute -top-2.5 w-px h-2.5 bg-[#d8dfdb]" />
                    <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white border border-emerald-700/45" />
                  </>
                )}
                <div className={`w-[54px] rounded-[28px] ${barClass}`} style={{ height: `${bar.height}px` }} />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-3 mt-3">
          {bars.map((bar, idx) => (
            <span key={`${bar.day}-${idx}`} className="w-[54px] text-center text-sm text-gray-400">
              {bar.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalytics;