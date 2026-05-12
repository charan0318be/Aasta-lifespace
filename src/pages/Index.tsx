import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { SideRail } from "@/components/SideRail";
import { Reveal } from "@/components/Reveal";
import { FloatTitle } from "@/components/FloatTitle";
import { CostEstimator, CostEstimatorHandle } from "@/components/CostEstimator";
import { toast } from "@/hooks/use-toast";

import hero from "@/assets/hero.jpg";
import about1 from "@/assets/about-1.jpg";
import about2 from "@/assets/about-2.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import philosophyImg from "@/assets/philosophy.jpg";
import logo from "@/assets/aasta-logo.png";

const SectionLabel = ({ index, children }: { index: string; children: string }) => (
  <div className="flex items-center gap-3 text-[10px] tracking-label uppercase text-copper">
    <span className="h-px w-6 bg-copper" />
    <span>{index} — {children}</span>
  </div>
);

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden vignette">
      <img
        src={hero}
        alt="Luxury wooden villa at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
      />
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 lg:px-20 lg:pb-28">
        <Reveal>
          <p className="mb-6 text-[10px] tracking-label uppercase text-ivory/80">
            Aasta Lifespace · Est. 1984
          </p>
        </Reveal>
        <Reveal delay={150}>
          <FloatTitle as="h1" className="font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[1.02] text-ivory" fromX={-160}>
            Built on Legacy.
            <br />
            <span className="font-italic-serif text-copper-soft">Defined</span>
            <span className="text-ivory"> by Precision.</span>
          </FloatTitle>
        </Reveal>
        <Reveal delay={350}>
          <p className="mt-8 max-w-xl text-base lg:text-lg text-ivory/80 leading-relaxed">
            Aasta Lifespaces — building excellence in homes, villas, and commercial spaces for over four decades.
          </p>
        </Reveal>
        <Reveal delay={500} className="mt-12 flex items-center gap-3 text-ivory/70">
          <ArrowDown size={16} className="animate-bounce" />
          <span className="text-[10px] tracking-label uppercase">Scroll</span>
        </Reveal>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="relative px-6 py-32 lg:px-20 lg:py-44">
    <div className="grid gap-16 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal><SectionLabel index="01">Origin</SectionLabel></Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            A legacy of building,
            <br />
            <span className="font-italic-serif text-copper">thoughtfully evolved.</span>
          </FloatTitle>
        </Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-ink-soft text-base lg:text-[17px] leading-relaxed">
        <Reveal>
          <p>For over four decades, our work has been shaped by a simple principle — if it is worth building, it is worth building well.</p>
        </Reveal>
        <Reveal delay={120}>
          <p>Aasta Lifespaces is rooted in deep construction expertise, refined over years of hands-on experience across homes, villas, and commercial spaces.</p>
        </Reveal>
        <Reveal delay={240}>
          <p>What time teaches is not just skill, but judgement. When to follow process. When to rely on instinct. When less is more.</p>
        </Reveal>
      </div>
    </div>

    <div className="mt-24 grid gap-6 lg:grid-cols-12">
      <Reveal className="lg:col-span-5 lg:col-start-2">
        <div className="overflow-hidden">
          <img src={about1} alt="Architectural detail" loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
        </div>
      </Reveal>
      <Reveal delay={200} className="lg:col-span-6 lg:mt-32">
        <div className="overflow-hidden">
          <img src={about2} alt="Craftsman at work" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] hover:scale-105" />
        </div>
      </Reveal>
    </div>
  </section>
);

const SERVICES = [
  { n: "01", title: "Construction", body: "A seamless journey from foundation to finish, executed with discipline and care." },
  { n: "02", title: "Design & Build", body: "Where design intent and execution move as one, resulting in clarity, efficiency, and coherence." },
  { n: "03", title: "Turnkey Interiors", body: "Spaces completed to the last detail, balancing function, aesthetics, and personal expression." },
];

const Services = () => (
  <section id="services" className="relative bg-ivory-deep px-6 py-32 lg:px-20 lg:py-44">
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal><SectionLabel index="02">Practice</SectionLabel></Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            Crafted
            <br />
            <span className="font-italic-serif text-copper">end-to-end.</span>
          </FloatTitle>
        </Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <div className="hairline mb-2" />
        {SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={i * 120}>
            <div className="group grid grid-cols-12 gap-6 py-10 transition-colors">
              <span className="col-span-2 font-display text-2xl text-copper">{s.n}</span>
              <div className="col-span-10">
                <h3 className="font-display text-3xl lg:text-4xl text-ink transition-transform duration-500 group-hover:translate-x-2">
                  {s.title}
                </h3>
                <p className="mt-3 text-ink-soft leading-relaxed">{s.body}</p>
              </div>
            </div>
            <div className="hairline" />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const PROJECTS = [
  { n: "216", name: "LW Residence", img: p1, place: "Bengaluru", span: "lg:col-span-7 lg:row-span-2" },
  { n: "141", name: "JM House", img: p2, place: "Goa", span: "lg:col-span-5" },
  { n: "212", name: "KM Residence", img: p4, place: "Hyderabad", span: "lg:col-span-5" },
  { n: "183", name: "Vista Atelier", img: p3, place: "Mumbai", span: "lg:col-span-7" },
  { n: "112", name: "Northstar Offices", img: p5, place: "Pune", span: "lg:col-span-5" },
];

const Projects = () => (
  <section id="projects" className="relative px-6 py-32 lg:px-20 lg:py-44">
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal><SectionLabel index="03">Selected Work</SectionLabel></Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            Spaces, carefully
            <br />
            <span className="font-italic-serif text-copper">brought to life.</span>
          </FloatTitle>
        </Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7 self-end">
        <Reveal delay={200}>
          <p className="text-ink-soft leading-relaxed text-lg">
            Each project reflects a commitment to quiet excellence — designed to endure, built to be lived in.
          </p>
        </Reveal>
      </div>
    </div>

    <div className="mt-20 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:auto-rows-[260px]">
      {PROJECTS.map((p, i) => (
        <Reveal key={p.n} delay={i * 100} className={`group relative overflow-hidden ${p.span}`}>
          <div className="relative h-full min-h-[420px] lg:min-h-0 w-full overflow-hidden">
            <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-90" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8 text-ivory">
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl lg:text-6xl text-ivory/90">{p.n}</span>
                <ArrowUpRight size={20} className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
              <div>
                <p className="text-[10px] tracking-label uppercase text-ivory/70">{p.place}</p>
                <h3 className="mt-1 font-display text-2xl lg:text-3xl">{p.name}</h3>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const STEPS = [
  { n: "01", title: "Understanding", body: "We begin by listening — to the site, the brief, and the people behind it." },
  { n: "02", title: "Design", body: "Ideas are translated into precise plans, drawings, and material decisions." },
  { n: "03", title: "Planning", body: "Budgets, timelines and supply chains aligned with quiet rigour." },
  { n: "04", title: "Execution", body: "Disciplined construction by craftsmen who have built for decades." },
  { n: "05", title: "Refinement", body: "Quality checks at every stage — never rushed, never compromised." },
  { n: "06", title: "Handover", body: "Delivered as intended. Lived in as imagined." },
];

const Approach = () => (
  <section id="approach" className="relative bg-ink text-ivory px-6 py-32 lg:px-20 lg:py-44">
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal><div className="flex items-center gap-3 text-[10px] tracking-label uppercase text-copper-soft"><span className="h-px w-6 bg-copper-soft" />04 — Methods</div></Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05]">
            Six steps,
            <br />
            <span className="font-italic-serif text-copper-soft">one standard.</span>
          </FloatTitle>
        </Reveal>
      </div>
    </div>

    <div className="mt-20 grid gap-x-12 gap-y-16 lg:grid-cols-2">
      {STEPS.map((s, i) => (
        <Reveal key={s.n} delay={(i % 2) * 150} className={i % 2 === 1 ? "lg:mt-24" : ""}>
          <div className="border-t border-ivory/15 pt-8">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] tracking-label uppercase text-ivory/50">Step {s.n}</span>
              <span className="font-display text-7xl lg:text-8xl text-copper-soft/40">{s.n}</span>
            </div>
            <h3 className="mt-4 font-display text-3xl lg:text-4xl">{s.title}</h3>
            <p className="mt-4 max-w-md text-ivory/70 leading-relaxed">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const TIERS = [
  {
    key: "essential",
    name: "Essential",
    tag: "Considered construction",
    price: "₹1,850",
    unit: "per sq. ft.",
    body: "A refined turnkey foundation for those seeking quiet quality without compromise.",
    features: ["Structural design & construction", "Standard premium finishes", "Project management", "12-month warranty", "Quarterly progress reviews"],
    featured: false,
  },
  {
    key: "signature",
    name: "Signature",
    tag: "Design and build, as one",
    price: "₹2,650",
    unit: "per sq. ft.",
    body: "Our most sought-after offering — architecture, interiors, and execution moving in concert.",
    features: ["Bespoke architectural design", "Curated material palette", "Imported fixtures & joinery", "Dedicated project lead", "24-month warranty"],
    featured: true,
  },
  {
    key: "atelier",
    name: "Atelier",
    tag: "Without compromise",
    price: "On request",
    unit: "Tailored engagement",
    body: "A fully bespoke commission for landmark residences and considered estates.",
    features: ["End-to-end design authorship", "Rare materials & custom millwork", "Smart-home & lighting integration", "Landscape & exterior design", "Lifetime structural assurance", "Concierge handover & aftercare"],
    featured: false,
  },
];

const Pricing = () => {
  const estimatorRef = useRef<CostEstimatorHandle>(null);

  const choosePlan = (key: string) => {
    estimatorRef.current?.selectPlan(key);
    const el = document.getElementById("estimator");
    if (el) {
      const offset = window.innerWidth >= 1024 ? 24 : 88;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="relative px-6 py-32 lg:px-20 lg:py-44">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal><SectionLabel index="05">Engagements</SectionLabel></Reveal>
          <Reveal delay={120}>
            <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
              Three ways
              <br />
              <span className="font-italic-serif text-copper">to begin.</span>
            </FloatTitle>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 self-end">
          <Reveal delay={200}>
            <p className="text-ink-soft leading-relaxed text-lg">Structured, but never rigid.</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 grid gap-6 lg:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 150}>
            <div className={`relative h-full flex flex-col p-8 lg:p-10 transition-all duration-500 ${t.featured ? "bg-ink text-ivory shadow-[var(--shadow-soft)]" : "bg-ivory-deep text-ink hover:-translate-y-1"}`}>
              {t.featured && (
                <span className="absolute -top-3 left-8 bg-copper text-ivory text-[10px] tracking-label uppercase px-3 py-1.5">Most chosen</span>
              )}
              <p className={`text-[10px] tracking-label uppercase ${t.featured ? "text-copper-soft" : "text-copper"}`}>{t.tag}</p>
              <h3 className="mt-4 font-display text-4xl">{t.name}</h3>
              <div className="mt-8">
                <p className="font-display text-5xl lg:text-6xl">{t.price}</p>
                <p className={`mt-2 text-sm ${t.featured ? "text-ivory/60" : "text-ink-soft"}`}>{t.unit}</p>
              </div>
              <p className={`mt-6 text-sm leading-relaxed ${t.featured ? "text-ivory/75" : "text-ink-soft"}`}>{t.body}</p>
              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check size={14} className={`mt-1 shrink-0 ${t.featured ? "text-copper-soft" : "text-copper"}`} />
                    <span className={t.featured ? "text-ivory/85" : "text-ink"}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => choosePlan(t.key)}
                className={`mt-10 inline-flex items-center justify-between border-t pt-5 text-sm tracking-label uppercase transition-colors ${t.featured ? "border-ivory/20 text-ivory hover:text-copper-soft" : "border-ink/15 text-ink hover:text-copper"}`}
              >
                Calculate estimate <ArrowUpRight size={16} />
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <CostEstimator ref={estimatorRef} />
    </section>
  );
};

const PILLARS = [
  { title: "Materials", body: "Optimised use. Chosen with intent. Built to last." },
  { title: "Light", body: "Natural light and ventilation, considered from the first sketch." },
  { title: "Longevity", body: "Spaces designed to perform — today and over time." },
];

const Philosophy = () => (
  <section id="philosophy" className="relative bg-ivory-deep px-6 py-32 lg:px-20 lg:py-44">
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
      <Reveal className="lg:col-span-5 order-2 lg:order-1">
        <div className="overflow-hidden">
          <img src={philosophyImg} alt="Soft natural light" loading="lazy" className="aspect-[3/4] w-full object-cover" />
        </div>
      </Reveal>
      <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
        <Reveal><SectionLabel index="06">Philosophy</SectionLabel></Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            A responsible
            <br />
            way <span className="font-italic-serif text-copper">to build.</span>
          </FloatTitle>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-8 text-ink-soft text-lg leading-relaxed max-w-xl">
            True luxury is not created through excess, but through precision, restraint, and intent. Sustainability, to us, is a series of conscious decisions.
          </p>
        </Reveal>
        <div className="mt-12 space-y-8">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="border-t border-ink/15 pt-6">
                <h4 className="font-display text-2xl text-ink">{p.title}</h4>
                <p className="mt-2 text-ink-soft leading-relaxed max-w-md">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Thank you", description: "We'll be in touch shortly to begin the conversation." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="relative bg-ink text-ivory px-6 py-32 lg:px-20 lg:py-44">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal><div className="flex items-center gap-3 text-[10px] tracking-label uppercase text-copper-soft"><span className="h-px w-6 bg-copper-soft" />07 — Let's Build</div></Reveal>
          <Reveal delay={120}>
            <FloatTitle className="mt-8 font-display text-5xl lg:text-7xl leading-[1.02]">
              Start your
              <br />
              <span className="font-italic-serif text-copper-soft">project.</span>
            </FloatTitle>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 text-ivory/70 text-lg leading-relaxed max-w-lg">
              If you value precision, clarity, and work done right — we should begin a conversation.
            </p>
          </Reveal>
          <Reveal delay={360} className="mt-16 grid gap-8 sm:grid-cols-2 max-w-lg text-sm">
            <div>
              <p className="text-[10px] tracking-label uppercase text-ivory/50">Studio</p>
              <p className="mt-2 text-ivory/85">Bengaluru, India</p>
            </div>
            <div>
              <p className="text-[10px] tracking-label uppercase text-ivory/50">Enquiries</p>
              <p className="mt-2 text-ivory/85">studio@aastalifespace.com</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="lg:col-span-5">
          <form onSubmit={onSubmit} className="space-y-6">
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "type", label: "Project type", type: "text" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-[10px] tracking-label uppercase text-ivory/50">{f.label}</label>
                <input
                  required
                  type={f.type}
                  name={f.name}
                  className="mt-2 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:border-copper-soft focus:outline-none transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="text-[10px] tracking-label uppercase text-ivory/50">Message</label>
              <textarea
                required
                name="message"
                rows={4}
                className="mt-2 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:border-copper-soft focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-3 border border-ivory/30 px-8 py-4 text-[10px] tracking-label uppercase transition-all hover:bg-copper hover:border-copper hover:text-ivory"
            >
              Begin a conversation
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </form>
        </Reveal>
      </div>

      <footer className="mt-32 pt-10 border-t border-ivory/15 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <img src={logo} alt="Aasta Lifespace" className="h-8 w-auto brightness-0 invert opacity-80" />
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] tracking-label uppercase text-ivory/50">
          <span>© {new Date().getFullYear()} Aasta Lifespace</span>
          <span>Instagram</span>
          <span>LinkedIn</span>
          <span>Privacy</span>
        </div>
      </footer>
    </section>
  );
};

const Index = () => {
  return (
    <main className="bg-background text-foreground lg:pl-[260px] pt-16 lg:pt-0">
      <SideRail />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Approach />
      <Pricing />
      <Philosophy />
      <Contact />
    </main>
  );
};

export default Index;
