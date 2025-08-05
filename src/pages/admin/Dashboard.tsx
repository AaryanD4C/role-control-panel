import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Activity, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UserGrowthChart } from "@/components/dashboard/UserGrowthChart";

export default function Dashboard() {
  const metrics = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12%",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Active Users",
      value: "1,892",
      change: "+8%",
      changeType: "positive" as const,
      icon: UserCheck
    },
    {
      title: "Daily Signups",
      value: "47",
      change: "-3%",
      changeType: "negative" as const,
      icon: Activity
    },
    {
      title: "Engagement Rate",
      value: "73.2%",
      change: "+5%",
      changeType: "positive" as const,
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Monitor your application's performance and user metrics.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <UserGrowthChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  );
}