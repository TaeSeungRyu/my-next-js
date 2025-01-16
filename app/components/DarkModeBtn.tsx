"use client";
import { useEffect, useState } from "react";

export default function DarkModeBtn() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialDarkMode = localStorage.getItem("theme") === "dark";
    setDarkMode(initialDarkMode);
    root.classList.toggle("dark", initialDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    const newMode = !darkMode;
    setDarkMode(newMode);
    root.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
    >
      {darkMode ? "다크모드" : "일반모드"}
    </button>
  );
}
