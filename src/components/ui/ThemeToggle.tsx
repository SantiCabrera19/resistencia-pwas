"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevents hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[68px] h-[34px] rounded-full bg-slate-200 dark:bg-slate-700 opacity-50" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-[34px] w-[68px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-opacity-75 ${
        isDark ? "bg-slate-800" : "bg-emerald-100"
      }`}
      role="switch"
      aria-checked={isDark}
    >
      <span className="sr-only">Toggle Dark Mode</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none inline-flex h-[26px] w-[26px] transform items-center justify-center rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          isDark ? "translate-x-[34px]" : "translate-x-[2px]"
        }`}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-slate-800" />
        ) : (
          <Sun className="h-4 w-4 text-orange-500" />
        )}
      </span>
    </button>
  );
}
