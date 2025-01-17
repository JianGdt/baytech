import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useTaskStore from "../store/useTaskStore";
import TasksDetails from "./TasksDetails";
import { TASKS_STATUS } from "../constant/status";
import ActionButton from "./ActionButton";

export default function TasksContainer() {
  const { tasks, addTask, deleteTask, updateTaskStatus, updateTaskContent, initializeTasks } = useTaskStore();

  useEffect(() => {
    initializeTasks();
  }, [initializeTasks]);

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    const fromStatus = source.droppableId;
    const toStatus = destination.droppableId;
    if (fromStatus !== toStatus) {
      updateTaskStatus(Number(result.draggableId), fromStatus, toStatus);
    }
  };
  
  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <h1 className="text-2xl font-bold">Tasks</h1>
    <ActionButton addTask={addTask} />
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {TASKS_STATUS.map((status) => (
        <TasksDetails
        key={status}
        status={status}
        tasks={tasks[status] || []}
        deleteTask={deleteTask}
        updateTaskContent={updateTaskContent}
        updateTaskStatus={updateTaskStatus}  
      />
      
      ))}
    </div>
  </DragDropContext>
  
  );
}
