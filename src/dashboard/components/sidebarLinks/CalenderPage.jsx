import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { AuthContext } from "../../../context/AuthProvider";
import { api } from "../../../services/api";
import { CalendarDays } from "lucide-react";

const CalendarPage = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const token = user?.token;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!token) return;

    api
      .getDashboard(token)
      .then((d) => {
        setData(d);
      })
      .finally(() => setLoading(false));
  }, [token, setLoading]);

  const analytics = data?.analytics || [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
        <p className="text-sm text-gray-500 mt-1">View scheduled events and activity timeline.</p>
      </motion.div>

      <div className="bg-white rounded-2xl p-4 sm:p-5">
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-3">
            {analytics.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 bg-[#fbfcfb] border border-gray-100 p-4 rounded-2xl"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-emerald-700" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{entry.date}</p>
                  <p className="text-xs text-gray-500">
                    {entry.views} views · {entry.clicks} clicks · {entry.conversions} conversions
                  </p>
                </div>
              </motion.div>
            ))}

            {analytics.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-12">No calendar events available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CalendarPage;