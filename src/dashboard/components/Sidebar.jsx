import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, ListTodo, Calendar, BarChart3, Users,
  Settings, HelpCircle, LogOut, CheckCircle2, Download, Smartphone
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard", badge: null },
  { icon: ListTodo, label: "Tasks", path: "/tasks", badge: "12" },
  { icon: Calendar, label: "Calendar", path: "/calendar", badge: null },
  { icon: BarChart3, label: "Analytics", path: "/analytics", badge: null },
  { icon: Users, label: "Team", path: "/team", badge: null },
];

const generalItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: HelpCircle, label: "Help", path: "/help" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className=" bg-gray-50 flex flex-col border-r border-gray-200 sticky top-0 rounded-xl "
    >
      {/* Logo */}
      <div className="px-6 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-lg font-bold text-gray-900">Donezo</span>
      </div>

      {/* Menu */}
      <div className="px-4 mt-2">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          Menu
        </p>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full transition-all duration-200
                  ${active ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-100 hover:text-green-700"}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold 
                    ${active ? "bg-white/20 text-white" : "bg-green-100 text-green-700"}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* General */}
      <div className="px-4 mt-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
          General
        </p>
        <nav className="space-y-1">
          {generalItems.map((item) => (
            <button
              key={item.path}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-gray-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200"
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Mobile App Card */}
      <div className="mt-auto px-4 pb-5">
        <div className="bg-green-800 rounded-2xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone className="w-5 h-5" />
            <span className="text-sm font-semibold">Download our Mobile App</span>
          </div>
          <p className="text-xs text-white/70 mb-3">Get easy in another way</p>
          <button className="w-full py-2 rounded-xl bg-white text-green-800 text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;