"use client";
import { useTheme } from "next-themes";
import React from "react";

export function ThemeToggler() {
  const { setTheme } = useTheme();
  return (
    <div className="text-dark ">
      <div className="flex">
        <div
          onClick={() => {
            setTheme("light");
          }}
        >
          Light
        </div>
        <div
          onClick={() => {
            setTheme("dark");
          }}
        >
          Dark
        </div>
      </div>
    </div>
  );
}
