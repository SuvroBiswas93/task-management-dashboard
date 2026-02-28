import React, { useContext, useEffect, useState } from "react";
import { Plus, Download } from "lucide-react";
import { Outlet, useLocation } from "react-router";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../context/AuthProvider";
import { api } from "../../services/api";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import StatsCards from "../dashboardPageComponents/StatsCards";
import ProjectAnalytics from "../dashboardPageComponents/ProjectAnalytics";
import Reminders from "../dashboardPageComponents/Reminders";
import ProjectList from "../dashboardPageComponents/ProjecList";
import TimeTracker from "../dashboardPageComponents/TimeTracker";
import ProjectProgress from "../dashboardPageComponents/ProjectProgress";
import TeamCollaboration from "../dashboardPageComponents/TeamCollaboration";

export default function Dashboard() {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const token = user?.token;
  const [dashboardData, setDashboardData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!token) return;
    api
      .getDashboard(token)
      .then((data) => setDashboardData(data))
      .catch(console.error);
  }, [token]);

  const isDashboardIndex = location.pathname === "/dashboard";

  return (
    <div className="relative min-h-screen bg-[#DAD9DC] p-4 sm:p-5">
      <div className="mx-auto h-[calc(100vh-2rem)] sm:h-[calc(100vh-2.5rem)] rounded-[30px] bg-white p-3 sm:p-4">
        <div className="flex gap-3 h-full">
        <div className="hidden lg:block w-64 shrink-0">
          <Sidebar />
        </div>

        <Sidebar mobileOnly isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <div className="flex-1 min-w-0 overflow-y-auto scrollbar-hide">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />

          {isDashboardIndex ? (
            <div className="mt-2 rounded-xl px-1 sm:px-2 pb-6 bg-[#F7F7F7]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-5 pt-4">
                <div>
                  <h1 className="text-[38px] leading-none font-semibold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Plan, prioritize, and accomplish your tasks with ease.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-700 text-white px-4 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer">
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>

                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-900 px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                    <Download className="w-4 h-4" />
                    <span>Import Data</span>
                  </button>
                </div>
              </div>

              {loading ? (
                <LoadingSpinner className="my-4" />
              ) : (
                <StatsCards data={dashboardData} />
              )}

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 mt-4">
                <div className="xl:col-span-9 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                    <div className="md:col-span-7">
                      <ProjectAnalytics data={dashboardData} />
                    </div>
                    <div className="md:col-span-3">
                      <Reminders />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
                    <div className="md:col-span-6">
                      <TeamCollaboration data={dashboardData} />
                    </div>
                    <div className="md:col-span-4">
                      <ProjectProgress data={dashboardData} />
                    </div>
                  </div>
                </div>

                <div className="xl:col-span-3 grid grid-cols-1 gap-4">
                  <ProjectList data={dashboardData} />
                  <TimeTracker />
                </div>
              </div>
            </div>
          ) : (
            <div className="pt-4 px-4 bg-[#F7F7F7] mt-2 rounded-xl min-h-[calc(100vh-10rem)]">
              <Outlet />
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}