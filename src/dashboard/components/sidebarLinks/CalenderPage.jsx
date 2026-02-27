import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
import { AuthContext } from "../../../context/AuthProvider";
import { api } from "../../../services/api";
import { CalendarDays } from "lucide-react";

const CalendarPage = () => {
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    api
      .getDashboard(token)
      .then((d) => {
        setData(d);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const analytics = data?.analytics || [];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 px-6 pb-6 overflow-auto">
        <TopBar />

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-500">
            View scheduled events and activity timeline.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-12">
                <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-3">
            {analytics.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm"
              >
                {/* Icon Circle */}
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                </div>

                {/* Analytics Info */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{entry.date}</p>
                  <p className="text-xs text-gray-500">
                    {entry.views} views · {entry.clicks} clicks · {entry.conversions} conversions
                  </p>
                </div>
              </motion.div>
            ))}

            {/* No data */}
            {analytics.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-12">
                No calendar events available.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarPage;