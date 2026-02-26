import React from 'react'
import TopBar from './TopBar'
import Sidebar from './Sidebar'


export default function Dashboard() {
    return (
        <div className="grid grid-cols-12 gap-1 min-h-screen bg-gray-100 w-full">
            {/* Sidebar on left */}
            <div className="col-span-3 m-1">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="col-span-9 flex flex-col m-1">
                <TopBar />
                {/* Add your main dashboard content here */}
            </div>
        </div>
    )
}
