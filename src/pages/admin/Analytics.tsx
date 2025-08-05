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
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))'
      ],
      borderColor: [
        'hsl(var(--chart-1))',
        'hsl(var(--chart-2))',
        'hsl(var(--chart-3))'
      ],
      borderWidth: 1,
    },
  ],
};

const engagementData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Page Views',
      data: [4000, 3000, 2000, 2780],
      borderColor: 'hsl(var(--chart-1))',
      backgroundColor: 'hsl(var(--chart-1))',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Sessions',
      data: [2400, 1398, 9800, 3908],
      borderColor: 'hsl(var(--chart-2))',
      backgroundColor: 'hsl(var(--chart-2))',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Bounce Rate (%)',
      data: [35, 42, 29, 38],
      borderColor: 'hsl(var(--chart-3))',
      backgroundColor: 'hsl(var(--chart-3))',
      borderWidth: 2,
      fill: false,
      tension: 0.4,
    },
  ],
};

const dailyActiveUsers = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Users',
      data: [234, 321, 287, 398, 456, 289, 198],
      backgroundColor: 'hsl(var(--chart-1))',
      borderColor: 'hsl(var(--chart-1))',
      borderWidth: 1,
      borderRadius: 4,
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