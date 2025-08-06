import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const activities = [
  {
    id: 1,
    user: "Harsh Patel",
    action: "Created new user account",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    type: "create"
  },
  {
    id: 2,
    user: "Aryan Sharma",
    action: "Updated user profile",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    type: "update"
  },
  {
    id: 3,
    user: "Aniket Singh",
    action: "Deleted user account",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: "delete"
  },
  {
    id: 4,
    user: "Sourav Kumar",
    action: "Changed app settings",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    type: "update"
  },
  {
    id: 5,
    user: "Priya Gupta",
    action: "Generated analytics report",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    type: "create"
  },
  {
    id: 6,
    user: "Rohit Verma",
    action: "Exported user data",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    type: "create"
  },
  {
    id: 7,
    user: "Neha Agarwal",
    action: "Modified user permissions",
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    type: "update"
  }
];

function getActionBadge(type: string) {
  switch (type) {
    case "create":
      return <Badge variant="default" className="bg-success text-success-foreground">Create</Badge>;
    case "update":
      return <Badge variant="default" className="bg-warning text-warning-foreground">Update</Badge>;
    case "delete":
      return <Badge variant="destructive">Delete</Badge>;
    default:
      return <Badge variant="secondary">Action</Badge>;
  }
}

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>
              {activity.user.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {getActionBadge(activity.type)}
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}