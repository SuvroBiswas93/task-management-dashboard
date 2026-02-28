import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../../services/api";
import { AuthContext } from "../../../context/AuthProvider";
import { MoreHorizontal } from "lucide-react";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";

const Tasks = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  const token = user?.token;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!token) return;

    api
      .getProducts()
      .then((res) => {
        const formatted = Array.isArray(res) ? res : res?.products || [];
        setProducts(formatted);
      })
      
  }, [token]);

  const handleTaskClick = (productId) => {
    navigate(`${productId}`);
  };

  const handleMoreOptions = (e, productId) => {
    e.stopPropagation();
    console.log("More options for product:", productId);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
      <p className="text-sm text-gray-500 mt-1">Manage and track all your project tasks.</p>

      <div className="mt-6 bg-white rounded-2xl p-4 sm:p-5">
        {loading ? (
          <div className="py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleTaskClick(product.id)}
                className="bg-[#fbfcfb] border border-gray-100 flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:border-emerald-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                  {product.name?.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">Category: {product.category} · ${product.price}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{product.sales}</p>
                  <p className="text-xs text-gray-500">sales</p>
                </div>

                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={(e) => handleMoreOptions(e, product.id)}
                >
                  <MoreHorizontal className="w-4 h-4 text-gray-500" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Tasks;