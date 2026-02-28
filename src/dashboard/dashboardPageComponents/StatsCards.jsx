import { ArrowUpRight } from "lucide-react";

const StatsCards = ({ data }) => {
  const overview = data?.overview || {};

  const cards = [
    {
      title: "Total Projects",
      value: overview.totalProjects ?? 24,
      subtitle: "Increased from last month",
      highlight: true,
      badge: 5,
    },
    {
      title: "Ended Projects",
      value: overview.endedProjects ?? 10,
      subtitle: "Increased from last month",
      highlight: false,
      badge: 6,
    },
    {
      title: "Running Projects",
      value: overview.runningProjects ?? 12,
      subtitle: "Increased from last month",
      highlight: false,
      badge: 2,
    },
    {
      title: "Pending Project",
      value: overview.pendingProjects ?? 2,
      subtitle: "On Discuss",
      highlight: false,
      badge: 2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={
            card.highlight
              ? "relative overflow-hidden text-white rounded-2xl p-5"
              : "bg-white rounded-2xl p-5"
          }
          style={
            card.highlight
              ? {
                  background:
                    "radial-gradient(120% 120% at 85% 85%, #2aa169 0%, #178252 38%, #0e5c39 78%, #0a4b30 100%)",
                }
              : undefined
          }
        >
          {card.highlight && (
            <>
              <div className="pointer-events-none absolute -top-14 -right-14 h-44 w-44 rounded-full bg-emerald-200/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-14 left-14 h-28 w-28 rounded-full bg-emerald-50/15 blur-3xl" />
            </>
          )}

          <div className="flex items-center justify-between mb-3">
            <p
              className={`text-sm font-medium ${
                card.highlight ? "text-white/85" : "text-gray-700"
              }`}
            >
              {card.title}
            </p>

            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                card.highlight
                  ? "bg-white text-gray-800"
                  : "border border-gray-200 bg-white"
              } cursor-pointer`}
            >
              <ArrowUpRight
                className={`w-4 h-4 ${
                  card.highlight ? "text-gray-700" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          <div className="relative mb-3 inline-block">
            {card.highlight && (
              <span
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-16 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(255, 226, 116, 0.45) 0%, rgba(255, 226, 116, 0.16) 45%, rgba(255, 226, 116, 0) 75%)",
                  filter: "blur(6px)",
                }}
              />
            )}
            <p
              className={`relative text-5xl leading-none font-semibold ${
                card.highlight ? "text-white" : "text-gray-900"
              }`}
              style={card.highlight ? { textShadow: "0 0 16px rgba(220,255,235,0.24)" } : undefined}
            >
              {card.value}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <span
              className={`inline-flex items-center justify-center gap-0.5 rounded-md border px-1.5 py-0.5 text-[10px] leading-none font-medium tracking-tight ${
                card.highlight
                  ? "text-lime-200 border-lime-300/70 bg-transparent"
                  : "text-emerald-600 border-emerald-200 bg-emerald-50"
              }`}
            >
              <span>{card.badge}</span>
              <svg
                className="w-2.5 h-2.5"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.2 6.4L5 3.6L7.8 6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className={`text-xs ${card.highlight ? "text-lime-200" : "text-[#2f9a78]"}`}>
              {card.subtitle}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;