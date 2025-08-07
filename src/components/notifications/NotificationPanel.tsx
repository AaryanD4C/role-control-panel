import { useState } from "react";
import { Bell, X, Check, Info, AlertTriangle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  user?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New User Registration',
    message: 'Harsh Kumar has registered for an account',
    type: 'info',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    user: 'Harsh Kumar'
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'Payment of ₹2,500 received from Aryan Sharma',
    type: 'success',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    user: 'Aryan Sharma'
  },
  {
    id: '3',
    title: 'System Warning',
    message: 'High memory usage detected on server',
    type: 'warning',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true
  },
  {
    id: '4',
    title: 'Profile Updated',
    message: 'Aniket Verma updated their profile information',
    type: 'info',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true,
    user: 'Aniket Verma'
  },
  {
    id: '5',
    title: 'Subscription Expired',
    message: 'Sourav Singh\'s premium subscription has expired',
    type: 'warning',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    read: false,
    user: 'Sourav Singh'
  }
];

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-96">
        <div className="p-2">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-3 rounded-lg border mb-2 transition-colors cursor-pointer",
                  notification.read ? "bg-muted/50" : "bg-background border-primary/20",
                  "hover:bg-muted/70"
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        {notification.user && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            {notification.user}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTime(notification.timestamp)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {!notification.read && (
                  <div className="absolute right-2 top-2 h-2 w-2 bg-primary rounded-full"></div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}