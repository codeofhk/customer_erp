import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Revenue = () => {
  const [revenue, setRevenue] = useState(0);
  const [grossProfit, setGrossProfit] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8000/api/sales/revenue')
      .then((response) => { setRevenue(response.data.value); })
      .catch((error) => { console.log(error); });

    axios.get('http://localhost:8000/api/sales/grossprofit')
      .then((response) => { setGrossProfit(response.data.value); })
      .catch((error) => { console.log(error); });
  }, []);

  return (
    <div className="grid grid-flow-row space-y-6 space-x-4">
      <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md flex-1 border-gray-950 border-2">
        <h1 className="text-xl font-bold">{revenue}</h1>
        <p className="text-lg">Revenue</p>
      </div>
      <div className="flex flex-col items-center justify-center p-4 border-2 rounded-lg shadow-md flex-1 border-gray-950">
        <h1 className="text-xl font-bold">{grossProfit}</h1>
        <p className="text-lg">Gross Profit</p>
      </div>
    </div>
  );
};

export default Revenue;