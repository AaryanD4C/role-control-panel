import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface ActivityLog {
  id: string;
  user: string;
  action: string;
  description: string;
  timestamp: Date;
  type: 'create' | 'update' | 'delete' | 'login' | 'logout';
  ipAddress: string;
  userAgent: string;
}

const mockLogs: ActivityLog[] = [
  {
    id: "1",
    user: "John Smith",
    action: "User Login",
    description: "Successfully logged into admin dashboard",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "login",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome 120.0"
  },
  {
    id: "2",
    user: "Sarah Johnson",
    action: "User Created",
    description: "Created new user account for 'Mike Brown'",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "create",
    ipAddress: "192.168.1.5",
    userAgent: "Firefox 121.0"
  },
  {
    id: "3",
    user: "Mike Wilson",
    action: "Settings Updated",
    description: "Changed notification preferences",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "update",
    ipAddress: "192.168.1.3",
    userAgent: "Safari 17.2"
  },
  {
    id: "4",
    user: "Emily Davis",
    action: "User Deleted",
    description: "Permanently deleted user account 'inactive_user@example.com'",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    type: "delete",
    ipAddress: "192.168.1.7",
    userAgent: "Chrome 120.0"
  },
  {
    id: "5",
    user: "Admin User",
    action: "System Export",
    description: "Exported user analytics report",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    type: "create",
    ipAddress: "192.168.1.2",
    userAgent: "Chrome 120.0"
  },
  {
    id: "6",
    user: "Tom Brown",
    action: "User Logout",
    description: "Logged out from admin dashboard",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    type: "logout",
    ipAddress: "192.168.1.9",
    userAgent: "Edge 120.0"
  }
];

function getActionBadge(type: ActivityLog['type']) {
  switch (type) {
    case "create":
      return <Badge variant="default" className="bg-success text-success-foreground">Create</Badge>;
    case "update":
      return <Badge variant="default" className="bg-warning text-warning-foreground">Update</Badge>;
    case "delete":
      return <Badge variant="destructive">Delete</Badge>;
    case "login":
      return <Badge variant="default" className="bg-chart-1 text-white">Login</Badge>;
    case "logout":
      return <Badge variant="secondary">Logout</Badge>;
    default:
      return <Badge variant="secondary">Action</Badge>;
  }
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === "all" || log.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleExport = () => {
    const csvContent = filteredLogs.map(log => 
      `"${log.timestamp.toISOString()}","${log.user}","${log.action}","${log.description}","${log.ipAddress}"`
    ).join('\n');
    
    const blob = new Blob([`Timestamp,User,Action,Description,IP Address\n${csvContent}`], 
      { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'activity-logs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground">
            Monitor and track all user activities and system events.
          </p>
        </div>
        <Button onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>
                          {log.user.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{log.user}</p>
                        <p className="text-xs text-muted-foreground">{log.userAgent}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{log.action}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {log.description}
                  </TableCell>
                  <TableCell>
                    {getActionBadge(log.type)}
                  </TableCell>
                  <TableCell className="text-sm font-mono">{log.ipAddress}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDistanceToNow(log.timestamp, { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}