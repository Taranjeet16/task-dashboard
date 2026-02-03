import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit3, Trash2, Calendar, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => Promise<void>;
  isDeleting?: boolean;
  isToggling?: boolean;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  isDeleting,
  isToggling,
}) => {
  return (
    <div 
      className={`group glass rounded-xl p-4 transition-all duration-200 animate-fade-in ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">
          {isToggling ? (
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          ) : (
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggle(task.id)}
              className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 
            className={`font-medium text-foreground transition-all ${
              task.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {task.title}
          </h4>
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground flex-wrap">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>
                {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
              </span>
            </div>
            {task.dueDate && (
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                new Date(task.dueDate) < new Date() && !task.completed 
                  ? 'bg-destructive/20 text-destructive' 
                  : 'bg-primary/20 text-primary'
              }`}>
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            disabled={isDeleting}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
