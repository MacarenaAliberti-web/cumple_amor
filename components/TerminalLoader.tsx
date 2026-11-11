"use client";
import { useState, useEffect } from "react";
import { SITE_DATA } from "@/data/content";

export default function TerminalLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [typedLine, setTypedLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < SITE_DATA.typewriterText.length) {
      const currentText = SITE_DATA.typewriterText[lineIndex];
      let charIdx = 0;

      const interval = setInterval(() => {
        if (charIdx <= currentText.length) {
          setTypedLine(currentText.slice(0, charIdx));
          charIdx++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setLineIndex((prev) => prev + 1);
          }, 800);
        }
      }, 45);

      return () => clearInterval(interval);
    } else {
      // Cuando termina todas las líneas, espera un segundo y avanza a la página
      const timeout = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, onComplete]);

  return (
    <div className="min-h-screen bg-[#070b12] flex items-center justify-center p-4 text-slate-100 font-mono">
      <div className="max-w-md w-full bg-slate-900/90 border border-blue-500/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800 text-slate-500 text-xs">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2">bash ~ birthday_init.sh</span>
        </div>
        <p className="min-h-[24px] text-blue-400 text-sm">
          &gt; {typedLine}
          <span className="animate-ping">|</span>
        </p>
      </div>
    </div>
  );
}
