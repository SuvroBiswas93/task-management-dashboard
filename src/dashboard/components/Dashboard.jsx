import React, { useState } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // added state for mobile toggle

  return (
    <div className="relative min-h-screen bg-gray-100 w-full">
      {/* Mobile Hamburger button */}
      <button
        className="sm:hidden fixed top-4 left-.1 z-50 p-2 rounded-lg bg-green-600 text-white"
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
          {/* Add your main dashboard content here */}
        </div>
      </div>
    </div>
  );
}
