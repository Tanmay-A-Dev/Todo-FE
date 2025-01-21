"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "@/components/TaskCard";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/tasks");
      setTasks(res.data);
      setCompletedCount(res.data.filter((task: any) => task.completed).length);
    } catch (err) {
      console.error("Failed to fetch tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleTask = async (id: number) => {
    const task = tasks.find((t: any) => t.id === id);
    try {
      await axios.put(`http://localhost:4000/tasks/${id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      console.error("Failed to toggle task.");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task.");
    }
  };

  return (
    <div className="p-8 bg-gray-800 text-white min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1
          className="text-6xl font-bold text-center"
          style={{
            background: "linear-gradient(to right, #4a9de2 50%, #6b1ad1 50%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          TODO APP
        </h1>
        <div className="text-xl">
          Task Count: {completedCount}/{tasks.length}
        </div>
      </header>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => (window.location.href = "/form")}
          className="bg-blue-500 text-white p-3 rounded-full flex items-center gap-2 hover:bg-blue-600"
        >
          <span>Create Task</span>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>

      {/* Tasks Section */}
      <div>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-400">
            No tasks available. Create one!
          </p>
        ) : (
          tasks.map((task: any) => (
            <TaskCard
              key={task.id}
              {...task}
              onToggle={() => toggleTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
