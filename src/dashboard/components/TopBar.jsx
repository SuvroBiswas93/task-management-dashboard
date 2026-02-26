import { Search, Bell, MessageSquare } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const TopBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between py-4 bg-gray-50 rounded-xl p-1 ">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

        <input
          type="text"
          placeholder="Search task"
          className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-gray-300 bg-white text-sm text-gray-900
                     placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 transition-all"
        />

        {/* Shortcut Keys */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400">
          <kbd className="text-xs bg-gray-200 px-1.5 py-0.5 rounded font-mono">⌘</kbd>
          <kbd className="text-xs bg-gray-200 px-1.5 py-0.5 rounded font-mono">F</kbd>
        </div>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-3 ml-4">
        <button className="p-2.5 rounded-xl border border-gray-300 bg-white hover:bg-green-100 transition-colors relative">
          <Bell className="w-5 h-5 text-gray-900" />
        </button>

        <button className="p-2.5 rounded-xl border border-gray-300 bg-white hover:bg-green-100 transition-colors">
          <MessageSquare className="w-5 h-5 text-gray-900" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 ml-2">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;