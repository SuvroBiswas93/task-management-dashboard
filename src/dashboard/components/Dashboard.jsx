import React, { useContext, useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Plus, Download } from "lucide-react";
import { Outlet } from 'react-router';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import { AuthContext } from "../../context/AuthProvider";
import { api } from '../../services/api';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import StatsCards from '../dashboardPageComponents/StatsCards';
import ProjectAnalytics from '../dashboardPageComponents/ProjectAnalytics';
import Reminders from '../dashboardPageComponents/Reminders';
import ProjectList from '../dashboardPageComponents/ProjecList';
import TimeTracker from '../dashboardPageComponents/TimeTracker';
import ProjectProgress from '../dashboardPageComponents/ProjectProgress';
import TeamCollaboration from '../dashboardPageComponents/TeamCollaboration';

export default function Dashboard() {
  const { user, loading, setLoading } = useContext(AuthContext);
  const token = user?.token;

  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    api
      .getDashboard(token)
      .then((data) => setDashboardData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token, setLoading]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-100 w-full">
      {/* Mobile Hamburger button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-600 text-white"
        onClick={() => setSidebarOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="grid grid-cols-12 gap-1">
        {/* Desktop Sidebar */}
        <div className="hidden sm:block col-span-3 m-1">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />}

        {/* Main Content */}
        <div className="col-span-12 sm:col-span-9 flex flex-col m-1">
          <TopBar />
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6 pt-4 px-2"
          >
            <div className=' '>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-500 py-1">
                Plan, prioritize, and accomplish your tasks with ease.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 bg-emerald-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Add Project</span>
              </button>

              <button className="flex-1 sm:flex-initial flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-900 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Import Data</span>
              </button>
            </div>
          </motion.div>
          {/* Stats */}

          {loading ? (
            <LoadingSpinner className="my-4" />
          ) : (
            <StatsCards data={dashboardData} />
          )}


          {/* Middle Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4 ">
            <div className="lg:col-span-4">
              <ProjectAnalytics data={dashboardData} />
            </div>
            <div className="lg:col-span-4">
              <Reminders />
            </div>
            <div className="lg:col-span-4">
              <ProjectList data={dashboardData} />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
            <div className="lg:col-span-4">
              <TeamCollaboration data={dashboardData} />
            </div>
            <div className="lg:col-span-4">
              <ProjectProgress data={dashboardData} />
            </div>
            <div className="lg:col-span-4">
              <TimeTracker />
            </div>
          </div>

          {/* This is where the child routes will render */}
          <div className="mt-4 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}