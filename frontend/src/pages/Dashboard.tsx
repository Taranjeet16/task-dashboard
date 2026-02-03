import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { ProfileCard } from '@/components/ProfileCard';
import { TaskList } from '@/components/TaskList';
import { Button } from '@/components/ui/button';
import { LogOut, CheckCircle, Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useCallback } from 'react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskStats, setTaskStats] = useState({ pending: 0, completed: 0 });

  const handleStatsChange = useCallback((pending: number, completed: number) => {
    setTaskStats({ pending, completed });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:inline">TaskFlow</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Welcome, <span className="text-foreground font-medium">{user?.name}</span>
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Profile */}
          <aside 
            className={`lg:w-80 flex-shrink-0 ${
              sidebarOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="sticky top-24">
              <ProfileCard />
              
              {/* Stats */}
              <div className="glass rounded-2xl p-6 mt-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold gradient-text">{taskStats.pending}</p>
                    <p className="text-xs text-muted-foreground">Pending</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{taskStats.completed}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main - Tasks */}
          <main className="flex-1 min-w-0">
            <TaskList onStatsChange={handleStatsChange} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
