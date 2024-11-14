import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";

type NotificationProps = {
  title?: string;
  message: string;
  type?: "warning" | "error" | "success";
  time?: number; // in ms
  onClose?: () => void; // Callback function to close the notification
};

const Notification: React.FC<NotificationProps> = ({
  title = "",
  message,
  type = "warning",
  time = 5000,
  onClose,
}) => {
  const [progress, setProgress] = useState(100); // Progress for the time bar
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 100 / (time / 100), 0));
    }, 100);

    // Hide the notification when progress reaches 0
    if (progress === 0) {
      clearInterval(interval);
      setIsVisible(false);
      onClose?.(); // Call the onClose callback
    }

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [progress, time, onClose]);

  if (!isVisible || !message) return null;

  const color =
    type === "warning" ? "#f39c12" : type === "error" ? "#e74c3c" : "#2ecc71";

  return (
    <div className="animate-fade-in fixed bottom-12 left-5 z-50 flex max-w-80 items-center gap-4 overflow-hidden rounded-3xl bg-white px-5 py-4 text-primary shadow-md md:max-w-none">
      <Icon icon="mdi:alert-circle" className="h-11 w-11" />
      <div className="flex flex-col gap-2">
        <p className="text-lg"> {title}</p>
        <p className="max-w-60 overflow-hidden text-wrap" style={{ color }}>
          {message}
        </p>
      </div>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="w-8"
      >
        <Icon icon="mdi:close" className="h-6 w-6" />
      </button>
      <div
        style={{
          backgroundColor: color,
          width: `${progress}%`,
        }}
        className="absolute bottom-0 left-0 h-1 rounded duration-300"
      />
    </div>
  );
};

export default Notification;
