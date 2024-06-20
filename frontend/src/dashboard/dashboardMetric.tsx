import React from 'react';
import Revenue from '../Financial/revenue';
import SalesGraph from '../Sales/salesGraph';

const DashboardMetric: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 ">
      <div className="md:w-1/4">
        <Revenue />
      </div>
      <div className="md:w-3/4">
        <SalesGraph />
      </div>
    </div>
  );
};

export default DashboardMetric;
//Dashboard
//Revenue
//Last 6 months sales
//account receivable and payable
//Top 5 products