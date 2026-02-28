import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const colorMap = [
  "bg-emerald-800",   
  "bg-yellow-500",    
  "bg-blue-500",      
  "bg-green-500",    
  "bg-red-500"        
];

const ProjectList = ({ data }) => {
  const products = data?.products || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="bg-white rounded-2xl p-5 border border-gray-200 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Products</h3>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-800/10 transition-colors">
          <Plus className="w-3.5 h-3.5" /> New
        </button>
      </div>

      <div className="space-y-3">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className="flex items-start gap-3"
          >
            <div className={`w-3 h-3 rounded-full mt-1.5 ${colorMap[i % colorMap.length]}`} />
            <div className="flex-1 justify-center items-center">
              <p className="text-sm font-medium text-gray-900">{product.name}</p>
              <p className="text-xs text-gray-500">${product.price} · {product.sales} sales</p>
            </div>
            
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectList;