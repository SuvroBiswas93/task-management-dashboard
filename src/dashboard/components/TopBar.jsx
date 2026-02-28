import { Search, Bell, Mail, ChevronDown, User, Settings, LogOut, Menu } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const TopBar = ({ onMenuClick }) => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#f7f7f7] rounded-xl px-4 py-3 w-full">
      <div className="flex items-center gap-2 w-full sm:w-auto flex-1 min-w-0">
        <button
          className="lg:hidden h-10 w-10 shrink-0 rounded-xl border border-gray-200 bg-white text-emerald-700 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-center"
          onClick={onMenuClick}
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 min-w-0 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search task"
            className="w-full pl-10 pr-20 py-2.5 rounded-xl bg-white text-sm text-gray-900
                     placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/15 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400">
            <kbd className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-mono">⌘</kbd>
            <kbd className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-mono">F</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
          <Mail className="w-4.5 h-4.5 text-gray-700" />
        </button>

        <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer">
          <Bell className="w-4.5 h-4.5 text-gray-700" />
        </button>

        <div className="relative ml-1 sm:ml-2" ref={menuRef}>
          <button
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/70 transition-colors cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>

            <div className="hidden sm:flex flex-col leading-tight text-left">
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || "Totok Michael"}
              </p>
              <p className="text-xs text-gray-400">{user?.email || "tmichael20@mail.com"}</p>
            </div>
            <ChevronDown
              className={`hidden sm:block w-4 h-4 text-gray-500 transition-transform ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20">
              <button className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                <User className="w-4 h-4" />
                Profile
              </button>
              <button className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;