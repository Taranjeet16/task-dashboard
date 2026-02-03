import { useState, useEffect, useCallback, useMemo } from 'react';
import { Task, TaskFormData } from '@/types';
import { taskApi } from '@/services/api';
import { TaskForm } from './TaskForm';
import { TaskItem } from './TaskItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Loader2, ListTodo, Filter } from 'lucide-react';
import { toast } from 'sonner';

type FilterStatus = 'all' | 'pending' | 'completed';

interface TaskListProps {
  onStatsChange?: (pending: number, completed: number) => void;
}

export const TaskList = ({ onStatsChange }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await taskApi.list(searchQuery || undefined);
      setTasks(data);
    } catch (err: any) {
      toast.error(err.message || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const debounce = setTimeout(fetchTasks, 300);
    return () => clearTimeout(debounce);
  }, [fetchTasks]);

  const handleCreate = async (data: TaskFormData) => {
    setFormLoading(true);
    try {
      const newTask = await taskApi.create(data);
      setTasks(prev => [newTask, ...prev]);
      setIsCreating(false);
      toast.success('Task created successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create task');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (data: TaskFormData) => {
    if (!editingTask) return;
    setFormLoading(true);
    try {
      const updatedTask = await taskApi.update(editingTask.id, data);
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
      setEditingTask(null);
      toast.success('Task updated successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update task');
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggle = async (id: string) => {
    setTogglingId(id);
    try {
      const updatedTask = await taskApi.toggleComplete(id);
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
    } catch (err: any) {
      toast.error(err.message || 'Failed to update task');
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await taskApi.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success('Task deleted');
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete task');
    } finally {
      setDeletingId(null);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  // Notify parent of stats changes
  useEffect(() => {
    onStatsChange?.(pendingCount, completedCount);
  }, [pendingCount, completedCount, onStatsChange]);

  // Filter tasks by status
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filterStatus === 'pending') return !task.completed;
      if (filterStatus === 'completed') return task.completed;
      return true;
    }).sort((a, b) => {
      // Sort by due date first (tasks with due dates come first, then by date)
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [tasks, filterStatus]);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">My Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {pendingCount} pending, {completedCount} completed
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="gradient-primary text-primary-foreground"
          disabled={isCreating}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <Select value={filterStatus} onValueChange={(value: FilterStatus) => setFilterStatus(value)}>
          <SelectTrigger className="w-full sm:w-[160px] bg-secondary border-border">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            <SelectItem value="all">All Tasks</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Create Form */}
      {isCreating && (
        <div className="glass rounded-xl p-4 animate-scale-in">
          <TaskForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreating(false)}
            isLoading={formLoading}
          />
        </div>
      )}

      {/* Edit Form */}
      {editingTask && (
        <div className="glass rounded-xl p-4 animate-scale-in">
          <TaskForm
            task={editingTask}
            onSubmit={handleUpdate}
            onCancel={() => setEditingTask(null)}
            isLoading={formLoading}
          />
        </div>
      )}

      {/* Task List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          {searchQuery || filterStatus !== 'all' ? (
            <>
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No tasks found</h3>
              <p className="text-muted-foreground">
                {filterStatus !== 'all' 
                  ? `No ${filterStatus} tasks found` 
                  : 'Try a different search term'}
              </p>
            </>
          ) : (
            <>
              <ListTodo className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground">No tasks yet</h3>
              <p className="text-muted-foreground">Create your first task to get started</p>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onEdit={setEditingTask}
              onDelete={handleDelete}
              isDeleting={deletingId === task.id}
              isToggling={togglingId === task.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
