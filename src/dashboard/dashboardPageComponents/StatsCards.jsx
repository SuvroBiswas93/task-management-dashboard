import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const StatsCards = ({ data }) => {
  const overview = data?.overview;

  const cards = [
    {
      title: "Total Users",
      value: overview?.totalUsers?.toLocaleString() ?? "—",
      subtitle: "All registered users",
      highlight: true,
      icon: TrendingUp,
    },
    {
      title: "Active Users",
      value: overview?.activeUsers?.toLocaleString() ?? "—",
      subtitle: "Currently active",
      highlight: false,
      icon: TrendingUp,
    },
    {
      title: "Revenue",
      value: overview?.revenue ? `$${overview.revenue.toLocaleString()}` : "—",
      subtitle: "Total earnings",
      highlight: false,
      icon: TrendingUp,
    },
    {
      title: "Growth",
      value: overview?.growth ? `${overview.growth}%` : "—",
      subtitle: "Compared to last month",
      highlight: false,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          className={
            card.highlight
              ? "bg-emerald-800 text-white rounded-2xl p-5 transition-all duration-300"
              : "bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300"
          }
        >
          <div className="flex items-center justify-between mb-4">
            <p
              className={`text-sm font-medium ${
                card.highlight ? "text-white/80" : "text-gray-500"
              }`}
            >
              {card.title}
            </p>

            <button
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                card.highlight
                  ? "bg-white/20"
                  : "border border-gray-200"
              }`}
            >
              <ArrowUpRight
                className={`w-4 h-4 ${
                  card.highlight ? "text-white" : "text-gray-900"
                }`}
              />
            </button>
          </div>

          <p
            className={`text-4xl font-extrabold mb-2 ${
              card.highlight ? "text-white" : "text-gray-900"
            }`}
          >
            {card.value}
          </p>

          <div className="flex items-center gap-1.5">
            {card.icon && (
              <card.icon
                className={`w-3.5 h-3.5 ${
                  card.highlight ? "text-white/70" : "text-green-500"
                }`}
              />
            )}
            <p
              className={`text-xs ${
                card.highlight ? "text-white/70" : "text-gray-500"
              }`}
            >
              {card.subtitle}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;