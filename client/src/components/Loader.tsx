"use client";

export default function Loader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-dark-bg transition-all duration-500">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative flex flex-col items-center animate-in fade-in zoom-in duration-700">
        {/* Loader Animation */}
        <div className="relative w-24 h-24 mb-10">
          {/* External Ring */}
          <div className="absolute inset-0 border-[2px] border-white/5 rounded-[24px]" />

          {/* Animated Spinning Gradient Ring */}
          <div className="absolute inset-0 border-[3px] border-transparent border-t-primary border-r-secondary/50 rounded-[24px] animate-[spin_2s_linear_infinite]" />

          {/* Inner Pulsing Core */}
          <div className="absolute inset-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] animate-pulse">
            <span className="text-2xl">💬</span>
          </div>

          {/* Orbiting Particles */}
          <div className="absolute -top-2 -left-2 w-4 h-4 bg-primary rounded-full blur-[2px] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-secondary rounded-full blur-[2px] animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1.5s]" />
        </div>

        {/* Text and Skeleton Labels */}
        <div className="text-center">
          <h3 className="text-xl font-heading font-extrabold text-white mb-2 tracking-tight">
            Gigly
          </h3>
          <div className="flex items-center gap-2 justify-center">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-[0.2em] ml-1">
              {message}
            </p>
          </div>
        </div>
      </div>

      {/* Security Tagline */}
      <div className="absolute bottom-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
        <div className="w-1 h-1 rounded-full bg-success animate-pulse" />
        Encrypted Handshake Protocol
      </div>
    </div>
  );
}
