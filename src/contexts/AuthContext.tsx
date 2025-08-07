import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'Admin' | 'Editor' | 'Viewer';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@admin.com': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'John Admin',
      email: 'admin@admin.com',
      role: 'Admin'
    }
  },
  'editor@demo.com': {
    password: 'editor123',
    user: {
      id: '2',
      name: 'Jane Editor',
      email: 'editor@demo.com',
      role: 'Editor'
    }
  },
  'viewer@demo.com': {
    password: 'viewer123',
    user: {
      id: '3',
      name: 'Bob Viewer',
      email: 'viewer@demo.com',
      role: 'Viewer'
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());

  // Session timeout (30 minutes)
  const SESSION_TIMEOUT = 30 * 60 * 1000;

  const login = async (email: string, password: string): Promise<boolean> => {
    const userRecord = mockUsers[email];
    
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      setLastActivity(Date.now());
      localStorage.setItem('auth-user', JSON.stringify(userRecord.user));
      localStorage.setItem('last-activity', Date.now().toString());
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth-user');
    localStorage.removeItem('last-activity');
  };

  // Update activity on user interaction
  const updateActivity = () => {
    setLastActivity(Date.now());
    localStorage.setItem('last-activity', Date.now().toString());
  };

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth-user');
    const storedActivity = localStorage.getItem('last-activity');
    
    if (storedUser && storedActivity) {
      const lastActivityTime = parseInt(storedActivity);
      const now = Date.now();
      
      if (now - lastActivityTime < SESSION_TIMEOUT) {
        setUser(JSON.parse(storedUser));
        setLastActivity(lastActivityTime);
      } else {
        // Session expired
        logout();
      }
    }
  }, []);

  // Session timeout check
  useEffect(() => {
    if (!user) return;

    const checkSession = () => {
      const now = Date.now();
      if (now - lastActivity > SESSION_TIMEOUT) {
        logout();
      }
    };

    const interval = setInterval(checkSession, 60000); // Check every minute
    
    // Add event listeners for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      clearInterval(interval);
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [user, lastActivity]);

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}