import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  Calendar,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Download,
  Smartphone,
} from "lucide-react";
import { AuthContext } from "../../context/AuthProvider";
import downloadCardBg from "../../assets/downloadCardBg.svg";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "", badge: null },
  { icon: ListTodo, label: "Tasks", path: "tasks", badge: "24" },
  { icon: Calendar, label: "Calendar", path: "calendar", badge: null },
  { icon: BarChart3, label: "Analytics", path: "analytics", badge: null },
  { icon: Users, label: "Team", path: "team", badge: null },
];

const generalItems = [
  { icon: Settings, label: "Settings"},
  { icon: HelpCircle, label: "Help" },
];

const Sidebar = ({ isOpen, setIsOpen, mobileOnly = false }) => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const isActiveLink = (path) => {
    if (path === "") {
      return location.pathname === "/dashboard";
    }
    return location.pathname === `/dashboard/${path}`;
  };

  return (
    <>
      {!mobileOnly && (
      <aside className="hidden lg:flex flex-col bg-[#f7f7f7] rounded-2xl h-full p-4 overflow-y-auto">
        <div className="px-2 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Donezo</span>
        </div>

        <div className="mt-4">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
            Menu
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = isActiveLink(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full transition-all duration-200
                    ${
                      active
                        ? "text-gray-900"
                        : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-emerald-700" />
                  )}
                  <item.icon className={`w-4.55 h-4.5 ${active ? "text-emerald-700" : ""}`} />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold leading-none 
                      ${active ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-700"}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
            General
          </p>
          <nav className="space-y-1">
            {generalItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
              >
                <item.icon className="w-4.5 h-4.5" />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
            >
              <LogOut className="w-4.5 h-4.5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        <div className="mt-auto px-2 pb-2 pt-4">
          <div className="relative overflow-hidden rounded-2xl p-3 text-white bg-linear-to-br from-[#04140d] via-[#062219] to-[#020c08]">
            <div className="pointer-events-none absolute inset-0 bg-[#04140d]" />
            <img
              src={downloadCardBg}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative z-10 mb-2">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/12 border border-white/25">
                <Download className="w-3 h-3" />
              </span>
            </div>
            <p className="relative z-10 text-[16px] leading-[1.12] font-medium mb-1">
              Download our
              <br />
              Mobile App
            </p>
            <p className="relative z-10 text-[11px] text-white/65 mb-3">Get easy in another way</p>
            <button className="relative z-10 w-full py-2 rounded-full bg-[#0d6f45] text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
              Download
            </button>
          </div>
        </div>
      </aside>
      )}

      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
          <div
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
          />
          <aside
            className={`relative w-64 h-screen bg-[#f3f4f3] p-4 rounded-r-2xl overflow-y-auto transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="px-2 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Donezo</span>
            </div>

            <div className="mt-4">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Menu
              </p>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const active = isActiveLink(item.path);
                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full transition-all duration-200
                        ${
                          active
                            ? "text-gray-900"
                            : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-700"
                        }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-emerald-700" />
                      )}
                      <item.icon className={`w-4.5 h-4.5 ${active ? "text-emerald-700" : ""}`} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-semibold leading-none
                          ${active ? "bg-emerald-700 text-white" : "bg-emerald-100 text-emerald-700"}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                General
              </p>
              <nav className="space-y-1">
                {generalItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200"
                  >
                    <item.icon className="w-4.5 h-4.5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium w-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>

            <div className="mt-8 px-2 pb-4">
              <div className="relative overflow-hidden rounded-2xl p-3 text-white bg-linear-to-br from-[#04140d] via-[#062219] to-[#020c08]">
                <div className="pointer-events-none absolute inset-0 bg-[#04140d]" />
                <img
                  src={downloadCardBg}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 mb-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/12 border border-white/25">
                    <Download className="w-3 h-3" />
                  </span>
                </div>
                <p className="relative z-10 text-[16px] leading-[1.12] font-medium mb-1">
                  Download our
                  <br />
                  Mobile App
                </p>
                <p className="relative z-10 text-[11px] text-white/65 mb-3">Get easy in another way</p>
                <button className="relative z-10 w-full py-2 rounded-full bg-[#0d6f45] text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
                  Download
                </button>
              </div>
            </div>
          </aside>
      </div>
    </>
  );
};

export default Sidebar;