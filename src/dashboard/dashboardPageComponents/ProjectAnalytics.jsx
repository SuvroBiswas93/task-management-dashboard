import { motion } from "framer-motion";

const ProjectAnalytics = ({ data }) => {
    const analytics = data?.analytics || [];
    const values = analytics.map((a) => a.views || 0);
    const labels = analytics.map((a) => {
        const d = new Date(a.date);
        return d.toLocaleDateString("en-US", { weekday: "short" });
    });

    console.log('ProjectAnalytics - values:', values);
    console.log('ProjectAnalytics - data:', data);

    if (values.length === 0) return null;

    const maxVal = Math.max(...values) || 1;
    const yAxisMax = Math.ceil(maxVal / 25) * 25;

    // Array of different colors for bars
    const barColors = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#059669', '#10b981'];
    
    // Define which bars should be dashed AND gray (first and last bar)
    const isDashedGrayBar = (index) => {
        const totalBars = values.length;
        return index === 0 || index === totalBars - 1; // First and last bar
    };

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
                {/* Y-axis labels */}
                <div className="hidden xs:flex flex-col justify-between text-xs text-gray-400 pr-2 sm:pr-3 py-1 h-24 sm:h-36">
                    <span>{yAxisMax}</span>
                    <span>{Math.round(yAxisMax * 0.75)}</span>
                    <span>{Math.round(yAxisMax * 0.5)}</span>
                    <span>{Math.round(yAxisMax * 0.25)}</span>
                    <span>0</span>
                </div>

                {/* Chart container */}
                <div className="flex-1 relative h-24 sm:h-36">
                   
                   {/* Bars */}
                      <div className="flex items-end justify-around gap-1 sm:gap-2 h-full relative z-10">
                        {values.map((val, i) => {
                            const height = (val / yAxisMax) * 100;
                            const isDashedGray = isDashedGrayBar(i);

                            return (
                                <div key={i} className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-8 h-full">
                                    {val > 0 && (
                                        <span className="text-[10px] sm:text-xs font-semibold text-gray-900 bg-gray-100 px-1 sm:px-2 py-0.5 rounded-md">
                                            {val}
                                        </span>
                                    )}

                                    <div className="w-full flex-1 flex items-end">
                                        {isDashedGray ? (
                                            // Dashed AND gray bar style (first and last bar)
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ delay: 0.4 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                                                className="w-full"
                                                style={{ 
                                                    minHeight: height > 0 ? '2px' : '0px',
                                                    background: 'repeating-linear-gradient(45deg, #9ca3af, #9ca3af 4px, #d1d5db 4px, #d1d5db 8px)',
                                                    borderRadius: '15px',
                                                }}
                                            />
                                        ) : (
                                            // Solid colored bar style for all other bars
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{ delay: 0.4 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                                                className="w-full"
                                                style={{ 
                                                    minHeight: height > 0 ? '2px' : '0px',
                                                    backgroundColor: barColors[i % barColors.length],
                                                    borderRadius: '15px',
                                                }}
                                            />
                                        )}
                                    </div>

                                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium">{labels[i]}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectAnalytics;