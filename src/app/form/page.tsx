"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateTask = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title || !color) {
      setError("Please provide both title and color.");
      return;
    }

    try {
      await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, color, completed: false }),
      });
      router.push("/"); // Redirect to the home page
    } catch (err) {
      setError("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-gray-800 text-white min-h-screen flex flex-col items-center justify-center">
    <div className="mb-8 text-center">
      <h1 className="text-5xl font-bold text-[#4a9de2] mb-2">TODO</h1>
      <h1 className="text-5xl font-bold text-[#6b1ad1]">App</h1>
    </div>
  
    <div className="flex flex-col items-center justify-center p-6 max-w-md mx-auto bg-gray-800 text-white rounded-lg shadow-lg w-full">
      <h2 className="text-3xl font-bold text-center mb-6">Create Task</h2>
  
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
  
      <div className="mb-6 w-full">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <div className="mb-6 w-full">
        <label className="block text-sm font-medium mb-2">Color</label>
        <div className="flex gap-6 justify-center">
          {["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "teal", "indigo"].map((clr) => (
            <button
              key={clr}
              onClick={() => setColor(clr)}
              className={`p-3 rounded-full transition-all duration-300 ${
                color === clr
                  ? "border-4 border-white scale-110"
                  : "border border-gray-600"
              }`}
              style={{ backgroundColor: clr }}
            >
              <span className="text-xs font-semibold text-white">{clr.charAt(0).toUpperCase() + clr.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>
  
      <div className="flex justify-center gap-4 w-full">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 w-full"
        >
          Save
        </button>
        <button
          onClick={() => router.push("/")}
          className="bg-gray-600 text-white p-3 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 w-full"
        >
          Back
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default CreateTask;
