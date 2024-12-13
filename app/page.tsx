"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(0); // Initialize as 0, not null
  const [showClock, setShowClock] = useState(false);

  useEffect(() => {
    if (showClock) {
      // Calculate the target time (3 PM tomorrow)
      const now = new Date();
      const target = new Date();
      target.setDate(now.getDate() + 1);
      target.setHours(15, 0, 0, 0); // 3:00 PM

      const calculateTimeLeft = () => {
        const currentTime = new Date();
        return Math.max(0, Math.floor((target.getTime() - currentTime.getTime()) / 1000)); // Seconds left
      };

      // Set the initial time left after component mounts
      setTimeLeft(calculateTimeLeft());

      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer); // Cleanup interval on component unmount
    }
  }, [showClock]);

  const formatTime = (seconds: number) => {
    if (seconds === 0) return "Loading..."; // Handle initial zero state
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-black text-white font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-bold">Wondering when you can see me?</h1>
        {!showClock ? (
          <button
            onClick={() => setShowClock(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Find out!
          </button>
        ) : (
          <div className="text-6xl font-mono">{formatTime(timeLeft)}</div>
        )}
      </main>
    </div>
  );
}
