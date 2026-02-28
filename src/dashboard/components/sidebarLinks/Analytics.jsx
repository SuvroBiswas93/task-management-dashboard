import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../../context/AuthProvider";
import { api } from "../../../services/api";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";

const COLORS = {
  primary: "#166534",
  border: "#e5e7eb",
  muted: "#9ca3af",
  foreground: "#111827",
  success: "#22c55e",
  card: "#ffffff",
};

const Analytics = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const token = user?.token;
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    if (!token) return;

    api
      .getAnalytics(token)
      .then((data) => {
        const formatted = Array.isArray(data) ? data : data?.analytics || [];
        setAnalytics(formatted);
      })
      .finally(() => setLoading(false));
  }, [token, setLoading]);

  const tooltipStyle = {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    color: COLORS.foreground,
  };
  const tickStyle = { fontSize: 11, fill: COLORS.muted };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Visualize your project performance and trends.</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Views Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-4 rounded-2xl"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Views Over Time</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={analytics}>
                <defs>
                  <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="date" tick={tickStyle} />
                <YAxis tick={tickStyle} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke={COLORS.primary}
                  fill="url(#viewsGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Clicks Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 rounded-2xl"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Clicks Over Time</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="date" tick={tickStyle} />
                <YAxis tick={tickStyle} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="clicks" fill={COLORS.primary} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Conversions Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-4 rounded-2xl lg:col-span-2"
          >
            <h3 className="font-semibold text-gray-900 mb-4">Conversions Trend</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="date" tick={tickStyle} />
                <YAxis tick={tickStyle} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="conversions"
                  stroke={COLORS.success}
                  strokeWidth={2}
                  dot={{ fill: COLORS.success, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Analytics;