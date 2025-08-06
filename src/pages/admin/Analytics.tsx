import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const userRoleData = {
  labels: ['Viewers', 'Editors', 'Admins'],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgb(34, 197, 94)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)'
      ],
      borderWidth: 2,
      hoverOffset: 4,
    },
  ],
};

const engagementData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Page Views',
      data: [4000, 3000, 2000, 2780],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointRadius: 5,
    },
    {
      label: 'Sessions',
      data: [2400, 1398, 9800, 3908],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(16, 185, 129)',
      pointRadius: 5,
    },
    {
      label: 'Bounce Rate (%)',
      data: [35, 42, 29, 38],
      borderColor: 'rgb(251, 146, 60)',
      backgroundColor: 'rgba(251, 146, 60, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(251, 146, 60)',
      pointRadius: 5,
    },
  ],
};

const dailyActiveUsers = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Users',
      data: [234, 321, 287, 398, 456, 289, 198],
      backgroundColor: [
        'rgba(168, 85, 247, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(14, 165, 233, 0.8)'
      ],
      borderColor: [
        'rgb(168, 85, 247)',
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(239, 68, 68)',
        'rgb(236, 72, 153)',
        'rgb(14, 165, 233)'
      ],
      borderWidth: 2,
      borderRadius: 6,
    },
  ],
};

const chartOptions = {
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

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
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
};

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Detailed insights into user behavior and platform performance.
        </p>
      </div>

      {/* Top Row - Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>User Role Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <Pie data={userRoleData} options={pieOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <Bar data={dailyActiveUsers} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly Revenue</span>
                <span className="font-medium">₹2,54,300</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-chart-1 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">User Retention Rate</span>
                <span className="font-medium">84%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-chart-2 h-2 rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Feature Adoption</span>
                <span className="font-medium">67%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-chart-3 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row - Detailed Charts */}
      <div className="grid gap-6 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>User Engagement Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <Line data={engagementData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}