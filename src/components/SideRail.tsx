import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/aasta-logo.png";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "approach", label: "Approach" },
  { id: "pricing", label: "Pricing" },
  { id: "philosophy", label: "Philosophy" },
  { id: "contact", label: "Contact" },
];

export const SideRail = () => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = window.innerWidth >= 1024 ? 0 : 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Desktop side rail */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-[260px] flex-col justify-between border-r border-ink/10 bg-ivory/80 backdrop-blur-md px-8 py-10">
        <button onClick={() => go("home")} className="block">
          <img src={logo} alt="Aasta Lifespace" className="h-9 w-auto" />
        </button>
        <nav className="flex flex-col gap-5">
          {NAV.map((item, i) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className={cn(
                  "group flex items-center gap-4 text-left text-sm font-sans-ui transition-colors",
                  isActive ? "text-copper" : "text-ink-soft hover:text-ink"
                )}
              >
                <span className="tracking-label text-[10px] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative">
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-copper transition-all duration-500",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </span>
              </button>
            );
          })}
        </nav>
        <p className="text-[10px] tracking-label uppercase text-ink-soft">
          Est. 1984 — India
        </p>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between border-b border-ink/10 bg-ivory/90 backdrop-blur-md px-5 py-4">
        <button onClick={() => go("home")}>
          <img src={logo} alt="Aasta Lifespace" className="h-7 w-auto" />
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-ink"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile sheet */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-30 bg-ivory transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex h-full flex-col items-start justify-center gap-6 px-10">
          {NAV.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="flex items-baseline gap-4 text-left"
            >
              <span className="tracking-label text-[10px] text-copper tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-3xl text-ink">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
