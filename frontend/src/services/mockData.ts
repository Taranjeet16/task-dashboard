import { User, Task } from '@/types';

// Simulated database
const USERS_KEY = 'mock_users';
const TASKS_KEY = 'mock_tasks';

// Sample seed user
const seedUser: User & { password: string } = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123', // In real app, this would be hashed
  createdAt: new Date().toISOString(),
};

const seedTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project setup',
    description: 'Set up the development environment and install dependencies',
    completed: true,
    userId: '1',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    title: 'Design the dashboard UI',
    description: 'Create wireframes and mockups for the main dashboard',
    completed: false,
    userId: '1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Implement authentication',
    description: 'Add login and signup functionality with JWT',
    completed: false,
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const initializeMockData = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([seedUser]));
  }
  if (!localStorage.getItem(TASKS_KEY)) {
    localStorage.setItem(TASKS_KEY, JSON.stringify(seedTasks));
  }
};

export const getUsers = (): (User & { password: string })[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: (User & { password: string })[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getTasks = (): Task[] => {
  const tasks = localStorage.getItem(TASKS_KEY);
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

// Simulate network delay
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));
