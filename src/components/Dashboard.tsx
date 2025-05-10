
import React from 'react';
import QuickStats from './QuickStats';
import QuickActions from './QuickActions';
import AlertsPanel from './AlertsPanel';
import RecentActivities from './RecentActivities';
import MonthlySummary from './MonthlySummary';

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard do Mecânico</h2>
        <p className="text-gray-600">Olá João, bem-vindo ao seu painel de controle.</p>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Quick Actions and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <QuickActions />
        </div>

        <div className="lg:col-span-1">
          <AlertsPanel />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>

        <div className="lg:col-span-1">
          <MonthlySummary />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center py-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">© 2023 CHECAR - Sistema de Revisão para Auto Centers</p>
      </footer>
    </div>
  );
};

export default Dashboard;
