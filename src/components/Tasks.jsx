import PropTypes from "prop-types";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { TASKS_STATUS } from "../constant/status";

Tasks.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTaskContent: PropTypes.func.isRequired,
  updateTaskStatus: PropTypes.func.isRequired,  
};

export default function Tasks({ task, deleteTask, updateTaskContent, updateTaskStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(task.content);
  const [newStatus, setNewStatus] = useState(task.status); 

  const handleDelete = () => {
    deleteTask(task.id, task.status);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newContent.trim()) {
      updateTaskContent(task.id, newContent, task.status);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewContent(task.content);
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setNewStatus(selectedStatus);
    updateTaskStatus(task.id, task.status, selectedStatus); 
  };

  const getTaskBackgroundColor = () => {
    switch (task.status) {
      case "Backlog":
        return "bg-gray-200";
      case "Ready to Do":
        return "bg-blue-200";
      case "In Progress":
        return "bg-yellow-200";
      case "Done":
        return "bg-green-200";
      default:
        return "bg-white";
    }
  };

  return (
    <div
      className={`p-4 rounded-md shadow mb-2 flex items-center flex-col gap-y-4 justify-between ${getTaskBackgroundColor()}`}
    >
      {isEditing ? (
        <div className="flex-1">
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={handleSave}
              className="text-green-500 text-sm font-bold"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 text-sm font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="flex-1">{task.content}</p>
          <div className="flex items-center space-x-2">
          <select
          value={newStatus}
          onChange={handleStatusChange}
          className="border p-1 rounded-md text-sm"
        >
     {TASKS_STATUS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="text-blue-500 text-sm flex items-center"
              >
                <FaEdit className="ml-1" />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 text-sm flex items-center"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
