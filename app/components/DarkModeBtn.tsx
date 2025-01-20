"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function DarkModeBtn() {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("");

  const toggleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme) setCurrentTheme(theme);
  }, [theme]);

  return (
    <>
      <div>
        다크모드의 상태가 글로벌이 아니므로 다른 페이지에서 새로고침하면
        사라집니다!
      </div>
      <button
        onClick={toggleDarkMode}
        className="animate-spin-slow px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
      >
        {currentTheme}
      </button>
    </>
  );
}
