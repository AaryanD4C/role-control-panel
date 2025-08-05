import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Signups',
      data: [12, 19, 8, 27, 23, 15, 9],
      backgroundColor: 'hsl(var(--chart-1))',
      borderColor: 'hsl(var(--chart-1))',
      borderWidth: 1,
      borderRadius: 4,
    },
    {
      label: 'Logins',
      data: [89, 103, 78, 134, 156, 67, 45],
      backgroundColor: 'hsl(var(--chart-2))',
      borderColor: 'hsl(var(--chart-2))',
      borderWidth: 1,
      borderRadius: 4,
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

export function OverviewChart() {
  return (
    <div className="h-[300px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
}