import { motion } from "framer-motion";

const ProjectAnalytics = ({ data }) => {
    const analytics = data?.analytics || [];
    const values = analytics.map((a) => a.views || 0);
    const labels = analytics.map((a) => {
        const d = new Date(a.date);
        return d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0);
    });

    if (values.length === 0) return null;

    const maxVal = Math.max(...values) || 1;
    const yAxisMax = Math.ceil(maxVal / 25) * 25;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-200 transition-all duration-300 w-full"
        >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Daily Views</h3>
            </div>

            <div className="relative flex">
                {/* Y-axis labels - hide on very small screens */}
                <div className="hidden xs:flex flex-col justify-between text-xs text-gray-400 pr-2 sm:pr-3 py-1 h-24 sm:h-35">
                    <span>{yAxisMax}</span>
                    <span>{Math.round(yAxisMax * 0.75)}</span>
                    <span>{Math.round(yAxisMax * 0.5)}</span>
                    <span>{Math.round(yAxisMax * 0.25)}</span>
                    <span>0</span>
                </div>

                {/* Grid lines */}
                <div className="absolute left-0 xs:left-8 sm:left-10 right-0 h-24 sm:h-35 pointer-events-none">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="border-b border-dashed border-gray-200 w-full absolute"
                            style={{ bottom: `${i * 25}%` }}
                        />
                    ))}
                </div>

                {/* Bars */}
                <div className="flex items-end justify-between gap-1 sm:gap-2 md:gap-3 h-24 sm:h-35 flex-1 relative">
                    {values.map((val, i) => {
                        const height = (val / yAxisMax) * 100;

                        return (
                            <div key={i} className="flex flex-col items-center gap-1 sm:gap-2 flex-1 min-w-[20px]">
                                {val > 0 && (
                                    <span className="text-[10px] sm:text-xs font-semibold text-gray-900 bg-gray-100 px-1 sm:px-2 py-0.5 rounded-md">
                                        {val}
                                    </span>
                                )}

                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ delay: 0.4 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                                    className="w-full max-w-4 sm:max-w-6 md:max-w-8 rounded-lg bg-emerald-800"
                                />

                                <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{labels[i]}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectAnalytics;