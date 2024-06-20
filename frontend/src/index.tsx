import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Chart, LinearScale, CategoryScale, LineController, LineElement, PointElement } from 'chart.js';

Chart.register(LinearScale, CategoryScale, LineController, LineElement, PointElement);

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
