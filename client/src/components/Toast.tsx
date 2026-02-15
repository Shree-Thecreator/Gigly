"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Wait for fade-out animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  const colors = {
    success: "border-success/20 bg-success/5 text-success",
    error: "border-error/20 bg-error/5 text-error",
    info: "border-primary/20 bg-primary/5 text-primary",
  };

  return (
    <div
      className={`fixed top-10 left-1/2 -translate-x-1/2 z-[1000] transition-all duration-500 transform ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${colors[type]}`}
      >
        <span className="text-xl">{icons[type]}</span>
        <p className="font-semibold text-sm tracking-wide">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 500);
          }}
          className="ml-4 hover:scale-110 transition-transform opacity-50 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
