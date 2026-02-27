import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { api } from "../../../services/api";
import Sidebar from "../Sidebar";
import TopBar from "../TopBar";
import { AuthContext } from "../../../context/AuthProvider";
import { MoreHorizontal } from "lucide-react";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    api
      .getProducts()
      .then((res) => {
        const formatted = Array.isArray(res) ? res : res?.products || [];
        setProducts(formatted);
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 px-6 pb-6 overflow-auto">
        <TopBar />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-sm text-gray-500">
            Manage and track all your project tasks.
          </p>
        </motion.div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
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
      </main>
    </div>
  );
};

export default Tasks;