import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Users',
      data: [400, 300, 600, 800, 700, 900, 1100, 1300, 1500, 1800, 2100, 2400],
      borderColor: 'hsl(291, 64%, 42%)',
      backgroundColor: 'hsl(291, 64%, 42%, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'hsl(291, 64%, 42%)',
      pointBorderColor: 'hsl(0, 0%, 100%)',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: 'hsl(291, 76%, 32%)',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'hsl(var(--muted-foreground))',
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'hsl(var(--card))',
      titleColor: 'hsl(var(--card-foreground))',
      bodyColor: 'hsl(var(--card-foreground))',
      borderColor: 'hsl(var(--border))',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'hsl(var(--muted-foreground))',
        font: {
          size: 12,
        },
      },
      grid: {
        color: 'hsl(var(--muted))',
      },
    },
    y: {
      ticks: {
        color: 'hsl(var(--muted-foreground))',
        font: {
          size: 12,
        },
      },
      grid: {
        color: 'hsl(var(--muted))',
      },
    },
  },
};

export function UserGrowthChart() {
  return (
    <div className="h-[300px] w-full">
      <Line data={data} options={options} />
    </div>
  );
}