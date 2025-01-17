import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: {
    Backlog: [],
    "Ready to Do": [],
    "In Progress": [],
    Done: [],
  },
  addTask: (taskContent, status) =>
    set((state) => {
      const newTask = { id: Date.now(), content: taskContent, status };
      const updatedTasks = {
        ...state.tasks,
        [status]: [...state.tasks[status], newTask],
      };
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
  deleteTask: (taskId, status) =>
    set((state) => {
      const updatedStatus = state.tasks[status].filter((task) => task.id !== taskId);
      const updatedTasks = { ...state.tasks, [status]: updatedStatus };
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }),
    updateTaskStatus: (taskId, fromStatus, toStatus) =>
      set((state) => {
        const task = state.tasks[fromStatus].find((task) => task.id === taskId);
        const updatedFromStatus = state.tasks[fromStatus].filter(
          (task) => task.id !== taskId
        );
        const updatedToStatus = [...state.tasks[toStatus], { ...task, status: toStatus }];
        const updatedTasks = {
          ...state.tasks,
          [fromStatus]: updatedFromStatus,
          [toStatus]: updatedToStatus,
        };
    
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      }),
    
    
      updateTaskContent: (taskId, newContent, status) =>
        set((state) => {
          const updatedTasks = { ...state.tasks };
          const task = updatedTasks[status].find((task) => task.id === taskId);
          if (task) {
            task.content = newContent; 
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            return { tasks: updatedTasks };
          }
        }),
      
  initializeTasks: () =>
    set(() => {
      const savedTasks = localStorage.getItem("tasks");
      return {
        tasks: savedTasks
          ? JSON.parse(savedTasks)
          : { Backlog: [], "Ready to Do": [], "In Progress": [], Done: [] },
      };
    }),
}));

export default useTaskStore;
