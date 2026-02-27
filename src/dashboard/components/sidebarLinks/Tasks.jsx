import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { api } from "../../../services/api";
import { AuthContext } from "../../../context/AuthProvider";
import { MoreHorizontal } from "lucide-react";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";

const Tasks = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
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
      .finally(() => setLoading(false));
  }, [token, setLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
      <p className="text-sm text-gray-500">
        Manage and track all your project tasks.
      </p>

      {loading ? (
        <div className="space-y-3 mt-6">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-3 mt-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white flex items-center gap-4 p-4 rounded-xl shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                {product.name?.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                <p className="text-xs text-gray-500">
                  Category: {product.category} · ${product.price}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{product.sales}</p>
                <p className="text-xs text-gray-500">sales</p>
              </div>

              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <MoreHorizontal className="w-4 h-4 text-gray-500" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Tasks;