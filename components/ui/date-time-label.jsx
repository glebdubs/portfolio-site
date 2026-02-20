import React, { useState, useEffect } from "react";
import CursorTraceText from "@/components/ui/hover-text-effect";

const DateTimeLabel = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toISOString().replace("T", " ").split(".")[0]; // Formats as YYYY-MM-DD HH:MM:SS
      setCurrentTime(formattedTime);
    };

    updateTime(); // Initial call to set time immediately
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <span className="font-mono text-lg text-orange-700">
        {currentTime} ACST
      </span>
    </div>
  );
};

export default DateTimeLabel;
