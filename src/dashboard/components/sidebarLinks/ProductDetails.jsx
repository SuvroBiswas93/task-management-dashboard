import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../../services/api";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { 
  ArrowLeft, 
  Package, 
  Tag, 
  DollarSign, 
  TrendingUp,
  Edit,
  Trash2,
  ShoppingCart
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading} = useContext(AuthContext); // Using global loading
  const token = user?.token;

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track if data fetch is complete

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProductDetails = async () => {
      setIsDataLoaded(false);
      try {
        const productData = await api.getProduct(id);
        setProduct(productData);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
        console.error('Error fetching product:', err);
      } finally {
        setIsDataLoaded(true); 
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id, token, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    console.log("Edit product:", product?.id);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        navigate('/dashboard/tasks');
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  
  if (loading || !isDataLoaded) {
    return (
      <div className="min-h-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
          <p className="text-gray-500 mb-4">
            {error || "Product not found"}
          </p>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="mb-6 max-w-4xl mx-auto"
    >
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleGoBack}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Product Details</h1>
      </div>

      {/* Main product card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Product header with colored background based on category */}
        <div className={`px-6 py-4 ${
          product.category === 'subscription' ? 'bg-emerald-50' : 'bg-blue-50'
        } border-b border-gray-100`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${
                product.category === 'subscription' ? 'bg-emerald-200' : 'bg-blue-200'
              } flex items-center justify-center`}>
                <Package className={`w-6 h-6 ${
                  product.category === 'subscription' ? 'text-emerald-700' : 'text-blue-700'
                }`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-sm text-gray-500">ID: {product.id}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              product.category === 'subscription' 
                ? 'bg-emerald-200 text-emerald-800' 
                : 'bg-blue-200 text-blue-800'
            }`}>
              {product.category}
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Price Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-sm text-gray-600">Price</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </p>
            </div>

            {/* Sales Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600">Total Sales</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {product.sales.toLocaleString()}
              </p>
            </div>

            {/* Revenue Card */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ShoppingCart className="w-4 h-4 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(product.price * product.sales)}
              </p>
            </div>
          </div>

          {/* Additional details */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Category:</span>
                <span className="text-gray-900 font-medium capitalize">{product.category}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Product ID:</span>
                <span className="text-gray-900 font-medium">{product.id}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Unit Price:</span>
                <span className="text-gray-900 font-medium">{formatCurrency(product.price)}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-emerald-600 cursor-pointer text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Product
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </div>

      
    </motion.div>
  );
};

export default ProductDetails;