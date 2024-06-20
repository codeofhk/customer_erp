import React from 'react';
import DashboardMenu from './dashboardMenu';
import DashboardMetric from './dashboardMetric';

const Dashboard: React.FC = () => {
  return (
    <div className="flex w-screen h-screen bg-paper font-sans">
      <div className="flex max-wrapper justify-center">
        <aside className=" w-60 opacity-100 backdrop-brightness-75 text-white rounded-lg shadow-lg z-40">
          <DashboardMenu />
        </aside>
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mx-auto">
            <DashboardMetric />
          </div>
        </main>
      </div>
    </div>
  );
};
export default Dashboard;