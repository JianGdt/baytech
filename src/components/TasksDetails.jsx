import { Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import TaskItem from "./Tasks";

const STATUS_COLORS = {
  Backlog: "bg-gray-100", 
  "Ready to Do": "bg-blue-100",
  "In Progress": "bg-yellow-100",
  Done: "bg-green-100",
};

TasksDetails.propTypes = {
  status: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTaskContent: PropTypes.func.isRequired,
  updateTaskStatus: PropTypes.func.isRequired,  
};

export default function TasksDetails({ status, tasks, deleteTask, updateTaskContent, updateTaskStatus }) {
  return (
    <div className={`rounded-md p-4 w-1/3 min-w-[250px] flex flex-col ${STATUS_COLORS[status]}`}>
      <h2 className="font-bold text-xl mb-4 text-center">{status}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4 flex-1 overflow-y-auto"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white p-4 rounded-md shadow cursor-pointer"
                  >
                    <TaskItem 
                      task={task} 
                      deleteTask={deleteTask} 
                      updateTaskContent={updateTaskContent} 
                      updateTaskStatus={updateTaskStatus}  
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
