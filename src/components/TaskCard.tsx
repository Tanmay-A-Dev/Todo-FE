import { FC } from "react";

interface TaskCardProps {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskCard: FC<TaskCardProps> = ({ title, color, completed, onToggle, onDelete }) => (
  <div className={`p-4 border-l-4 rounded-md mb-4 ${completed ? "bg-gray-700" : "bg-gray-800"}`} style={{ borderColor: color }}>
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div
          onClick={onToggle}
          className={`w-6 h-6 border-2 rounded-full cursor-pointer ${completed ? "bg-blue-500" : "bg-transparent"}`}
          style={{ borderColor: color }}
        />
        <h2 className={`text-lg font-medium ${completed ? "line-through text-gray-400" : ""}`}>
          {title}
        </h2>
      </div>
      <button
        onClick={onDelete}
        className="text-red-500 font-bold hover:underline"
      >
        Delete
      </button>
    </div>
  </div>
);

export default TaskCard;
