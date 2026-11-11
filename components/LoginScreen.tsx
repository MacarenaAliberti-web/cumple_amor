"use client";
import { useState } from "react";
import { SITE_DATA } from "@/data/content";
import { ShieldCheck, Lock } from "lucide-react";

export default function LoginScreen({ onUnlock }: { onUnlock: () => void }) {
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === SITE_DATA.passcode || inputCode.length === 8) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] flex items-center justify-center p-4 text-slate-100 font-mono relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 border border-blue-500/30 rounded-3xl shadow-2xl backdrop-blur-xl relative z-10 overflow-hidden">
        {/* BARRA SUPERIOR ESTILO TERMINAL (Como en la Img 1) */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-800/80 text-xs text-blue-400">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold">&gt;_</span>
            <span className="tracking-wide text-slate-300">
              security_access_v4.0.blue
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/80" />
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* ICONO CENTRAL CIRCULAR */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-950/50 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/10">
              <ShieldCheck className="w-9 h-9" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black tracking-tight text-white">
              Acceso Secreto
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
              {SITE_DATA.passcodeHint}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                maxLength={8}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="DDMMAAAA"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-center tracking-[0.3em] text-sm text-blue-300 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-[0.98] text-xs uppercase tracking-wider"
            >
              <Lock className="w-4 h-4" /> INGRESAR A LA SORPRESA 🚀
            </button>
          </form>

          {error && (
            <p className="text-red-400 text-xs text-center font-mono animate-bounce">
              [ERROR] Clave incorrecta. ¡Probá de nuevo! 😉
            </p>
          )}

          {/* SYSTEM STATUS FOOTER */}
          <div className="pt-2 text-center border-t border-slate-800/60">
            <p className="text-[10px] text-slate-500 tracking-wider">
              System Status:{" "}
              <span className="text-blue-400 font-bold">
                WAITING_FOR_LEAN_PASSCODE
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
