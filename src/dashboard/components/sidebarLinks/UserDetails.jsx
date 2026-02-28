import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api } from "../../../services/api";
import { AuthContext } from "../../../context/AuthProvider";
import LoadingSpinner from "../../../components/loadingSpinner/LoadingSpinner";
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  User as UserIcon,
  Edit,
  Trash2,
  Clock,
  BadgeCheck,
  AlertCircle
} from "lucide-react";

const statusStyles = {
  active: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  inactive: "bg-gray-100 text-gray-700 border border-gray-200",
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading} = useContext(AuthContext);
  const token = user?.token;

  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserDetails = async () => {
      setIsDataLoaded(false);
      try {
        const userData = await api.getUser(id);
        setUserData(userData);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch user details");
        console.error('Error fetching user:', err);
      } finally {
        setIsDataLoaded(true);
      }
    };

    if (id) {
      fetchUserDetails();
    }
  }, [id, token, navigate]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    console.log("Edit user:", userData?.id);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      try {
        navigate('/dashboard/team');
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading || !isDataLoaded) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !userData) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 text-center border border-gray-100 max-w-2xl mx-auto mt-8"
      >
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">
          {error || "User not found"}
        </p>
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Go Back
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto"
    >
      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleGoBack}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Team Member Details</h1>
      </div>

      {/* Main user card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* User header with status */}
        <div className="px-6 py-5 bg-linear-to-r from-emerald-50 to-white border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {getInitials(userData.name)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
                <p className="text-sm text-gray-500 mt-1">Member since {formatDate(userData.joinDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  statusStyles[userData.status] || statusStyles.inactive
                }`}
              >
                {userData.status}
              </span>
              {userData.status === 'active' && (
                <BadgeCheck className="w-5 h-5 text-emerald-500" />
              )}
            </div>
          </div>
        </div>

        {/* User details grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column - Contact Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Contact Information
              </h3>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-sm font-medium text-gray-900">{userData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Join Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(userData.joinDate)}
                      <span className="text-xs text-gray-500 ml-2">
                        ({getTimeAgo(userData.joinDate)})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">User ID</p>
                    <p className="text-sm font-medium text-gray-900">#{userData.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Activity & Stats */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Account Activity
              </h3>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Account Status</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    userData.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {userData.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Member since</span>
                    <span className="text-gray-900 font-medium">{formatDate(userData.joinDate)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last active</span>
                    <span className="text-gray-900 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {getTimeAgo(userData.joinDate)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Projects assigned</span>
                    <span className="text-gray-900 font-medium">3 active</span>
                  </div>
                </div>

                {/* Activity bar */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span>Activity level</span>
                    <span>{userData.status === 'active' ? 'High' : 'Low'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        userData.status === 'active' ? 'bg-emerald-500 w-3/4' : 'bg-gray-400 w-1/4'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent activity section */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Updated project settings</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Commented on task #123</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Joined the team</p>
                  <p className="text-xs text-gray-500">{formatDate(userData.joinDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button
              onClick={handleEdit}
              className="px-4 py-2 cursor-pointer bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Member
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDetails;