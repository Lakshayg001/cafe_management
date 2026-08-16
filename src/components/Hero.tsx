import { ArrowRight, Coffee, Heart, Leaf, MapPin, Sparkles, Timer } from 'lucide-react';
import logo from '../assets/velvet-brew-logo.jpg';
import { COLORS } from '../data/colors';

const PILLARS = [
  { icon: Leaf, title: 'Single-estate beans', copy: 'Sourced from Coorg smallholders' },
  { icon: Coffee, title: 'Expertly brewed', copy: 'Dialled in twice every morning' },
  { icon: Heart, title: 'Made with love', copy: 'Every cup finished by hand' },
  { icon: Timer, title: 'Ready in 8 min', copy: 'Order ahead, skip the queue' },
];

export default function Hero() {
  return (
    <section id="top" className="relative -mt-[104px] overflow-hidden pt-[104px]" style={{ backgroundColor: COLORS.espresso, fontFamily: "'Jost', sans-serif" }}>
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(204, 165, 86, 0.08)' }} />
      <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(204, 165, 86, 0.06)' }} />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        {/* ---------------- copy ---------------- */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span 
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ borderColor: 'rgba(204, 165, 86, 0.3)', backgroundColor: 'rgba(204, 165, 86, 0.1)', color: COLORS.gold }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Now open in Budaun
          </span>

          <h1 className="mt-5 font-bold leading-[0.95] tracking-tight text-[clamp(2.75rem,8vw,4.75rem)]" style={{ color: COLORS.cream }}>
            Experience
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#e6cda3] via-[#cca556] to-[#b38b39]">
              the finest brew
            </span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: 'rgba(253, 251, 247, 0.7)' }}>
            Small-batch roasts, honest ingredients and a counter that remembers your
            order. Pick your cup, pick your channel — we will have it ready.
          </p>

          <p className="relative text-[12px] text-white/40 mt-10">
            © 2026 Velvet Brew Café · Budaun
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a 
              href="#menu"
              className="group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold transition-transform hover:scale-105"
              style={{ backgroundColor: COLORS.gold, color: COLORS.espresso }}
            >
              Explore the menu
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#visit"
              className="inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3 text-[14px] font-semibold transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(253, 251, 247, 0.8)' }}
              onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = COLORS.cream;
              }}
              onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'rgba(253, 251, 247, 0.8)';
              }}
            >
              <MapPin className="h-4 w-4" />
              Visit us
            </a>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <p className="font-bold text-2xl" style={{ color: COLORS.cream }}>4.6</p>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'rgba(253, 251, 247, 0.5)' }}>
                Avg. rating
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- emblem stage ---------------- */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[420px] lg:block animate-in fade-in zoom-in-95 duration-1000 delay-150">
          <div className="absolute inset-0 rounded-full blur-2xl" style={{ background: 'linear-gradient(to bottom right, rgba(204,165,86,0.25), rgba(204,165,86,0.1), transparent)' }} />
          <div className="relative grid h-full place-items-center rounded-[2.5rem] border p-10 shadow-2xl" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'linear-gradient(to bottom right, rgba(23,15,10,0.7), rgba(15,10,7,0.9))' }}>
            <div className="absolute inset-0 rounded-[2.5rem] opacity-40 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23cca556\\' fill-opacity=\\'1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'1\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'1\\'/%3E%3C/g%3E%3C/svg%3E')" }} />
            
            <div className="animate-pulse" style={{ animationDuration: '6s' }}>
                <img src={logo} alt="Velvet Brew Logo" className="w-[260px] h-[260px] rounded-full object-cover" style={{ border: `2px solid ${COLORS.gold}` }} />
            </div>
          </div>

          <div
            className="absolute -bottom-4 -left-6 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md animate-bounce"
            style={{ borderColor: 'rgba(255,255,255,0.12)', backgroundColor: 'rgba(23,15,10,0.9)', animationDuration: '4.5s' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: COLORS.gold }}>
              Today's roast
            </p>
            <p className="mt-0.5 text-sm font-semibold" style={{ color: COLORS.cream }}>
              Coorg Estate · Medium
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- pillars ---------------- */}
      <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.08)' }}>
          {PILLARS.map(({ icon: Icon, title, copy }, i) => (
            <div
              key={title}
              className="flex items-center gap-3.5 p-5"
              style={{ backgroundColor: 'rgba(23,15,10,0.85)' }}
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border" style={{ borderColor: 'rgba(204,165,86,0.25)', backgroundColor: 'rgba(204,165,86,0.1)', color: COLORS.gold }}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-bold uppercase tracking-wider" style={{ color: COLORS.cream }}>
                  {title}
                </p>
                <p className="mt-0.5 truncate text-xs" style={{ color: 'rgba(253, 251, 247, 0.55)' }}>{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}