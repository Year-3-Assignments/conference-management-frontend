import React from 'react';
import { Line } from 'react-chartjs-2';

function LineChart({ months, workshopMonths }) {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Conferences per month',
      data: months,
      borderColor: ['rgb(75, 192, 192)'],
      backgroundColor: ['rgba(54, 162, 235, 0.2)'],
      fill: true
    }, {
      label: 'Workshops per month',
      data: workshopMonths,
      backgroundColor: ['rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255, 159, 64, 0.2)'],
      fill: true
    }]
  }
  return (
    <div>
      <Line data={data} />
    </div>
  );
}

export default LineChart;