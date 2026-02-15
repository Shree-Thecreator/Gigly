import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-main overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-lg shadow-[0_4px_12px_rgba(99,102,241,0.3)]">💬</div>
            <span className="text-xl font-heading font-bold tracking-tight">Gigly</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#security" className="hover:text-white transition-colors">Security</a>
            <Link href="/chat" className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl transition-all shadow-lg active:scale-95">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
        <div className="absolute top-40 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            New Experience
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-6 leading-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Connect Instantly, <br /> Securely, Anywhere.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            The next generation of real-time communication. Private rooms, encrypted messages, and a premium experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link href="/chat" className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-lg transition-all shadow-[0_8px_30px_rgb(99,102,241,0.3)] hover:-translate-y-1 active:scale-95">
              Start Chatting
            </Link>
            <a href="#features" className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-lg transition-all hover:-translate-y-1 active:scale-95 backdrop-blur-sm">
              Explore Features
            </a>
          </div>

          {/* Mockup Preview */}
          <div className="mt-20 relative group animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="absolute inset-0 bg-primary/20 rounded-[32px] blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
            <div className="relative glass-card rounded-[32px] p-2 border border-white/10 aspect-video md:aspect-[21/9] overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(15,23,42,0.8),rgba(15,23,42,0.4))] z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?auto=format&fit=crop&q=80&w=2070"
                alt="Chat Preview"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Built for Privacy</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Engineered from the ground up to ensure your conversations stay yours.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Private Rooms", desc: "Create disposable or permanent rooms with unique secret keys accessible only to invited guests.", icon: "🔒" },
              { title: "Real-time Sync", desc: "Powered by Socket.IO for lightning-fast messaging with zero latency and instant delivery.", icon: "⚡" },
              { title: "Premium UI", desc: "A sleek, modern interface designed with glassmorphism and smooth animations for a premium feel.", icon: "✨" }
            ].map((f, i) => (
              <div key={i} className="glass-card p-10 rounded-[24px] hover:border-primary/50 transition-all group">
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-success/10 border border-success/20 text-[10px] font-bold text-success uppercase tracking-widest mb-6 leading-none">
              Verified Security
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-6 leading-tight text-white">
              Your Privacy is <br /><span className="text-primary">Non-Negotiable.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Gigly is built with a "Privacy-First" architecture. We don't just protect your data; we ensure we never have to touch it.
            </p>

            <div className="space-y-6">
              {[
                { title: "Zero Data Persistence", desc: "Messages are delivered in real-time and never stored on our servers. What you say stays between you." },
                { title: "Point-to-Point Encryption", desc: "All socket connections are encrypted via TLS 1.3, ensuring that your data remains unreadable to third parties." },
                { title: "Secure Room Isolation", desc: "Every chat room is isolated with a cryptographically secure key, preventing unauthorized access." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-sm md:text-base">{item.title}</h4>
                    <p className="text-slate-400 text-xs md:text-sm leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full max-w-[500px]">
            <div className="glass-card p-10 rounded-[40px] border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-slate-900/50 rounded-3xl flex items-center justify-center text-5xl mb-8 shadow-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">🛡️</div>
                <h3 className="text-2xl font-bold mb-4 text-white">Encryption Shield</h3>
                <div className="w-full space-y-4 mb-8">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-primary animate-pulse" />
                  </div>
                  <div className="h-1.5 w-[70%] bg-white/5 rounded-full overflow-hidden mx-auto">
                    <div className="h-full w-[40%] bg-secondary animate-pulse" style={{ animationDelay: '500ms' }} />
                  </div>
                </div>
                <p className="text-slate-500 text-[10px] font-mono uppercase tracking-[0.2em]">Protocol: gigly-v1-aes-256</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center text-sm shadow-sm">💬</div>
            <span className="font-heading font-bold">Gigly</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Gigly Experience. All rights reserved.</p>
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
