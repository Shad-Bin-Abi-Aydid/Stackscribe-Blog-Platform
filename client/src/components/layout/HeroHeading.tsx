"use client";

import { useEffect, useState } from "react";

const words = ["Share", "Learn", "Build", "Grow"];

export default function HeroHeading() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 600);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="animate-fade-up delay-100 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-slate-900 dark:text-white">
      Where Developers{" "}
      {/* fixed-width inline container prevents sentence reflow */}
      <span className="inline-flex justify-center min-w-[5ch]">
        <span
          className="bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-10px)",
            transition: "opacity 600ms ease-in-out, transform 600ms ease-in-out",
          }}
        >
          {words[index]}
        </span>
      </span>{" "}
      &amp; Thrive
    </h1>
  );
}
