import create from 'zustand';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Store = {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
};

export const useTaskStore = create<Store>((set) => ({
  tasks: [],
  addTask: (text) =>
    set((state) => ({
      tasks: [...state.tasks, { id: Date.now(), text, completed: false }],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
}));


import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskStore = {
  tasks: Task[];
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  loadTasks: () => void;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  addTask: (title) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    const updated = [...get().tasks, newTask];
    set({ tasks: updated });
    AsyncStorage.setItem('tasks', JSON.stringify(updated)); // save to phone
  },

  deleteTask: (id) => {
    const updated = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updated });
    AsyncStorage.setItem('tasks', JSON.stringify(updated));
  },

  toggleTask: (id) => {
    const updated = get().tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    set({ tasks: updated });
    AsyncStorage.setItem('tasks', JSON.stringify(updated));
  },

  loadTasks: async () => {
    const stored = await AsyncStorage.getItem('tasks');
    if (stored) {
      set({ tasks: JSON.parse(stored) });
    }
  },
}));
