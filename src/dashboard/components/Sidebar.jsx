import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, ListTodo, Calendar, BarChart3, Users,
  Settings, HelpCircle, LogOut, CheckCircle2, Download, Smartphone, Menu
} from "lucide-react";
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
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-600 text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex flex-col bg-gray-50 border-r border-gray-200 sticky top-0 rounded-xl h-screen z-40 p-4">
        {/* Logo */}
        <div className="px-2 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Donezo</span>
        </div>

        {/* Menu */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">Menu</p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
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
                </Link>
              );
            })}
          </nav>
        </div>

        {/* General */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">General</p>
          <nav className="space-y-1">
            {generalItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-gray-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
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
        <div className="mt-auto px-2 pb-5">
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
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="sm:hidden fixed top-0 left-0 z-50 w-64 h-screen bg-gray-50 border-r border-gray-200 p-4 rounded-r-xl"
        >
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
              ✕
            </button>
          </div>

          {/* Rest of mobile sidebar (reuse desktop structure) */}
          <div className="px-2">
            {/* Logo */}
            <div className="px-2 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Donezo</span>
            </div>

            {/* Menu */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">Menu</p>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
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
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* General */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">General</p>
              <nav className="space-y-1">
                {generalItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-gray-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
        </motion.aside>
      )}
    </>
  );
};

export default Sidebar;