import axios from "axios";
import {
  User,
  Task,
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  TaskFormData,
} from "@/types";

/* ------------------------------------------------------------------ */
/* Axios instance */
/* ------------------------------------------------------------------ */

const api = axios.create({
  baseURL: "https://task-dashboard-backend-ptjo.onrender.com/api/v1",
});

/* Attach JWT automatically */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ------------------------------------------------------------------ */
/* Auth APIs */
/* ------------------------------------------------------------------ */

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await api.post("/auth/login", credentials);

    localStorage.setItem("token", res.data.token);

    // fetch profile after login
    const profile = await userApi.getProfile();

    return {
      token: res.data.token,
      user: profile,
    };
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const res = await api.post("/auth/signup", credentials);

    localStorage.setItem("token", res.data.token);

    // fetch profile after signup
    const profile = await userApi.getProfile();

    return {
      token: res.data.token,
      user: profile,
    };
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

/* ------------------------------------------------------------------ */
/* User APIs */
/* ------------------------------------------------------------------ */

export const userApi = {
  getProfile: async (): Promise<User> => {
    const res = await api.get("/me");
    return res.data;
  },

  updateProfile: async (data: {
    name?: string;
    email?: string;
  }): Promise<User> => {
    const res = await api.put("/me", data);
    return res.data;
  },
};

/* ------------------------------------------------------------------ */
/* Task APIs */
/* ------------------------------------------------------------------ */

export const taskApi = {
  list: async (search?: string): Promise<Task[]> => {
    const res = await api.get("/tasks");

    let tasks: Task[] = res.data;

    if (search) {
      const q = search.toLowerCase();
      tasks = tasks.filter((t) => t.title.toLowerCase().includes(q));
    }

    return tasks;
  },

  get: async (id: string): Promise<Task> => {
    const res = await api.get(`/tasks/${id}`);
    return res.data;
  },

  create: async (data: TaskFormData): Promise<Task> => {
    const res = await api.post("/tasks", {
      title: data.title,
      description: data.description,
      completed: false,
    });
    return res.data;
  },

  update: async (
    id: string,
    data: Partial<TaskFormData & { completed: boolean }>
  ): Promise<Task> => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  toggleComplete: async (id: string): Promise<Task> => {
    const task = await taskApi.get(id);
    return taskApi.update(id, { completed: !task.completed });
  },
};
