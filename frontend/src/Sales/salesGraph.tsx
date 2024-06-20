import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

type salesDataValue = {
  label: string,
  order: number
};

const SalesGraph: React.FC = () => {
  const [salesData, setSalesData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sales/totalorders');
        response.data.value.forEach((value: salesDataValue) => {
          setSalesData((prev) => [...prev, value.order]);
          setLabels((prev) => [...prev, value.label]);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sales Orders',
        fill: false,
        lineTension: 0.1,
        //backgroundColor: 'rgba(0,0,0,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        data: salesData,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesGraph;