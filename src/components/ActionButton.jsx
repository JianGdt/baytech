import { useState } from "react";
import useTaskStore from "../store/useTaskStore"; 
import { TASKS_STATUS } from "../constant/status";

export default function ActionButton() {
  const { addTask } = useTaskStore();
  const [newTaskContent, setNewTaskContent] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(TASKS_STATUS[0]);

  const handleAddTask = () => {
    if (newTaskContent.trim()) {
      addTask(newTaskContent, selectedStatus);
      setNewTaskContent(""); 
    }
  };

  return (
    <div className="flex items-center justify-center flex-wrap text-center my-12 gap-4">
      <input
        type="text"
        value={newTaskContent}
        onChange={(e) => setNewTaskContent(e.target.value)}
        className="border p-2 rounded"
        placeholder="Enter task content"
      />
      <select
      value={selectedStatus}
      onChange={(e) => setSelectedStatus(e.target.value)}
      className="border p-2 rounded"
    >
      {TASKS_STATUS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
      <button
        onClick={handleAddTask}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
}
