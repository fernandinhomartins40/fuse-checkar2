
import React from 'react';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';

const AdminDashboard = () => {
  return (
    <div id="webcrumbs">
      <div className="w-full lg:w-[1200px] mx-auto bg-gray-50 min-h-screen p-0 font-inter">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
