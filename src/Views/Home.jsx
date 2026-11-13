import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  Code2,
  Palette,
  Zap,
  MapPin,
  Send,
  Download,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  Menu,
  X,
  ArrowUpRight,
  Briefcase,
} from "lucide-react";

import profileImg from "../assets/profile.jpeg";
import lmsPort from "../assets/lmsport.jpg";
import billcostro from "../assets/billcostro.jpg";
import product from "../assets/product.jpg";
import thulsi from "../assets/thulsi.jpg";
import jain from "../assets/jain.jpg";
import real from "../assets/real.jpg";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const ROLES = [
  "Vue.js interfaces",
  "React & Next.js apps",
  "pixel-perfect UIs",
  "fast, clean frontends",
];

const FRONTEND_SKILLS = [
  "VueJS",
  "NuxtJS",
  "ReactJS",
  "Next.js",
  "TypeScript",
  "Bootstrap",
  "Tailwind CSS",
  "HTML/CSS",
  "JavaScript",
];
const TOOLS_SKILLS = [
  "Git",
  "Linux",
  "REST APIs",
  "API Integration",
  "Vuex",
  "Pinia",
  "Redux",
];
const BACKEND_SKILLS = [
  "Node.js",
  "Express.js",
  "MongoDB",
  "MERN Stack",
  "REST API Design",
  "JWT Auth",
  "Postman",
];
const AI_SKILLS = [
  "ChatGPT",
  "Claude",
  "GitHub Copilot",
  "Cursor",
  "Prompt Engineering",
];
const LEARNING_SKILLS = [
  "React Native",
  "TypeScript (advanced)",
  "System Design",
];

const STATS = [
  { value: 2, suffix: "+", label: "Years of experience" },
  { value: 7, suffix: "", label: "Projects shipped" },
  { value: 200, suffix: "+", label: "Centres served by one app" },
];

const PROJECTS = [
  {
    img: lmsPort,
    alt: "Alliance LMS dashboard showing course list and student progress",
    title: "Alliance LMS",
    kind: "Vue",
    desc: "A modern learning management system that streamlines content delivery, learning workflows and student evaluation.",
    tags: ["VueJS", "JavaScript", "Tailwind CSS", "API"],
    github: "https://github.com/jaikumar-05",
    live: null,
  },
  {
    img: real,
    alt: "CampusForce quiz interface and reward points dashboard",
    title: "CampusForce",
    kind: "React",
    desc: "Student assessment platform where students take quizzes, track performance and redeem reward points.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "API Integration"],
    github: "https://github.com/jaikumar-05",
    live: null,
  },
  {
    img: billcostro,
    alt: "BillCostro spending charts and financial analytics",
    title: "BillCostro",
    kind: "Vue",
    desc: "Scalable cost management system that analyses spending patterns with real-time data visualisation.",
    tags: ["VueJS", "Vuex", "Tailwind CSS", "API"],
    github: "https://github.com/jaikumar-05",
    live: null,
  },
  {
    img: product,
    alt: "PMS kanban board with drag-and-drop task cards",
    title: "PMS – Product Management",
    kind: "Vue",
    desc: "Collaborative tool for planning, assigning and monitoring tasks through a drag-and-drop interface.",
    tags: ["VueJS", "Vuex", "Tailwind CSS", "API"],
    github: "https://github.com/jaikumar-05",
    live: null,
  },
  {
    img: thulsi,
    alt: "Acharya Tulsi Diagnostic Centre patient management interface",
    title: "Acharya Tulsi Diagnostic Centre",
    kind: "Django",
    desc: "Healthcare platform managing 200+ diagnostic centres.",
    tags: ["Bootstrap", "Django", "PostgreSQL"],
    github: "https://github.com/jaikumar-05",
    live: null,
  },
  {
    img: jain,
    alt: "Jain Online Learning personalised course dashboard",
    title: "Jain Online Learning",
    kind: "Vue",
    desc: "Personalised learning platform with account management and activity tracking.",
    tags: ["VueJS", "Vuex", "Tailwind CSS", "API"],
    github: "https://github.com/jaikumar-05",
    live: null,
  },
  {
    // TODO: replace img, title, desc and tags with your real MERN project details.
    // Add a screenshot in src/assets, import it at the top, and set img: yourImport
    img: null,
    alt: "StackFlow full-stack web application built with the MERN stack",
    title: "StackFlow – MERN Full-Stack App",
    kind: "MERN",
    desc: "Full-stack web application built on the MERN stack, with a REST API and a MongoDB database.",
    tags: ["MongoDB", "Express.js", "ReactJS", "Node.js"],
    github: "https://github.com/jaikumar-05",
    live: null,
  },
];

const FILTERS = ["All", "Vue", "React", "MERN", "Django"];

// ─── Global styles (fonts + keyframes) ───────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=DM+Sans:wght@400;500;600&display=swap');
    html { scroll-behavior: smooth; }
    .font-display { font-family: 'Bricolage Grotesque', 'DM Sans', system-ui, sans-serif; }
    .font-body { font-family: 'DM Sans', system-ui, sans-serif; }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes blob {
      0%,100% { transform: translate(0,0) scale(1); }
      33% { transform: translate(40px,-30px) scale(1.1); }
      66% { transform: translate(-30px,30px) scale(0.95); }
    }
    @keyframes caret { 50% { opacity: 0; } }
    .animate-marquee { animation: marquee 28s linear infinite; }
    .animate-blob { animation: blob 16s ease-in-out infinite; }
    .animate-caret { animation: caret 1s step-end infinite; }
    @media (prefers-reduced-motion: reduce) {
      .animate-marquee, .animate-blob, .animate-caret { animation: none; }
      html { scroll-behavior: auto; }
    }
  `}</style>
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className = "", y = 24 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <Reveal className="text-center mb-16">
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
        {children}
      </h2>
      <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
      {sub && <p className="mt-6 max-w-xl mx-auto text-gray-400">{sub}</p>}
    </Reveal>
  );
}

function useTypewriter(words, speed = 70, pause = 1600) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(reduce ? words[0] : "");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = words[i % words.length];
    let t;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2 : speed,
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause, reduce]);

  return text;
}

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const duration = 1400;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

// ─── Scroll progress + cursor spotlight ──────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left z-[60] bg-gradient-to-r from-blue-500 to-purple-500"
    />
  );
}

function Spotlight() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  useEffect(() => {
    if (reduce) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y, reduce]);
  const bg = useMotionTemplate`radial-gradient(500px circle at ${x}px ${y}px, rgba(59,130,246,0.12), transparent 70%)`;
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      style={{ background: bg }}
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
    />
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight the link for the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    document
      .getElementById(href.slice(1))
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020617]/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display font-extrabold text-xl text-white"
          aria-label="Back to top"
        >
          Jaikumar<span className="text-blue-400">.</span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = active === href.slice(1);
            return (
              <li key={label} className="relative">
                <button
                  onClick={() => go(href)}
                  className={`px-4 py-2 text-sm rounded-full transition-colors ${
                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <a
          href="/resume.pdf"
          download
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/50 text-blue-400 text-sm hover:bg-blue-500/10 transition"
        >
          <Download className="w-4 h-4" /> Resume
        </a>

        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#020617]/95 border-t border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => go(href)}
                  className="text-gray-300 hover:text-white text-left py-1"
                >
                  {label}
                </button>
              ))}
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 text-blue-400"
              >
                <Download className="w-4 h-4" /> Download resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Project card with 3D tilt ───────────────────────────────────────────────

function ProjectCard({ img, alt, title, desc, tags, github, live }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group rounded-2xl bg-white/[0.04] border border-white/10 hover:border-blue-500/60 transition-colors overflow-hidden shadow-xl flex flex-col"
    >
      <div className="relative overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={alt}
            loading="lazy"
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/30"
          >
            <Code2 className="w-14 h-14 text-blue-300/70" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent" />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-white">{title}</h3>
          {(live || github) && (
            <a
              href={live || github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${title}`}
              className="text-gray-500 group-hover:text-blue-400 transition-colors"
            >
              <ArrowUpRight className="w-5 h-5" />
            </a>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-400 leading-relaxed flex-1">
          {desc}
        </p>
        <div className="flex flex-wrap gap-2 mt-5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Contact form ────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "YOUR_SERVICE_ID",
          template_id: "YOUR_TEMPLATE_ID",
          user_id: "YOUR_PUBLIC_KEY",
          template_params: {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
            to_name: "Jaikumar",
          },
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white/[0.04] border border-white/10 rounded-2xl p-8"
    >
      {[
        { id: "name", label: "Name", type: "text", ph: "Your name" },
        { id: "email", label: "Email", type: "email", ph: "you@example.com" },
      ].map(({ id, label, type, ph }) => (
        <div className="mb-5" key={id}>
          <label htmlFor={id} className="text-sm text-gray-300 block mb-2">
            {label}
          </label>
          <input
            id={id}
            name={id}
            type={type}
            placeholder={ph}
            value={form[id]}
            onChange={handleChange}
            required
            className={field}
          />
        </div>
      ))}
      <div className="mb-8">
        <label htmlFor="message" className="text-sm text-gray-300 block mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell me about your project"
          value={form.message}
          onChange={handleChange}
          required
          className={`${field} resize-none`}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={status === "sending"}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {status === "sending" ? "Sending…" : "Send message"}
      </motion.button>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-green-400 text-sm"
          >
            Message sent. I'll reply soon.
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-red-400 text-sm"
          >
            Couldn't send your message. Email me directly at b.jai4067@gmail.com
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

function Home() {
  const reduce = useReducedMotion();
  const typed = useTypewriter(ROLES);
  const [filter, setFilter] = useState("All");
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const visible = PROJECTS.filter((p) => filter === "All" || p.kind === filter);

  return (
    <div className="font-body relative overflow-x-clip bg-[#020617] text-gray-300">
      <GlobalStyles />
      <ScrollProgress />
      <Spotlight />
      <Navbar />

      {/* Ambient background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="animate-blob absolute -top-40 -left-32 w-[32rem] h-[32rem] rounded-full bg-blue-600/20 blur-[120px]" />
        <div
          className="animate-blob absolute top-[30rem] -right-40 w-[28rem] h-[28rem] rounded-full bg-purple-600/20 blur-[120px]"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="relative z-10">
        {/* ── Hero ── */}
        <section className="min-h-screen flex items-center justify-center pt-20">
          <motion.div
            variants={heroContainer}
            initial={reduce ? "show" : "hidden"}
            animate="show"
            className="text-center px-6"
          >
            <motion.div
              variants={heroItem}
              className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/60"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              Frontend developer · Open to work
            </motion.div>

            <motion.h1
              variants={heroItem}
              className="font-display text-5xl md:text-8xl font-extrabold text-white tracking-tight leading-[1.05]"
            >
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                Jaikumar
              </span>
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="mt-8 text-xl md:text-3xl text-gray-300 h-10"
            >
              I build <span className="text-white font-medium">{typed}</span>
              <span className="animate-caret text-blue-400">|</span>
            </motion.p>

            <motion.p
              variants={heroItem}
              className="mt-6 max-w-2xl mx-auto text-gray-400 text-base md:text-lg"
            >
              Responsive web apps with Vue, React and Tailwind, built on clean,
              maintainable code.
            </motion.p>

            <motion.div
              variants={heroItem}
              className="flex flex-wrap justify-center gap-4 mt-10"
            >
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo("contact")}
                className="px-7 py-4 rounded-full bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-colors"
              >
                Get in touch
              </motion.button>
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollTo("projects")}
                className="px-7 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/15 transition-colors"
              >
                View work
              </motion.button>
              <motion.a
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                href="/resume.pdf"
                download
                className="flex items-center gap-2 px-7 py-4 rounded-full border border-blue-500/50 text-blue-400 font-semibold hover:bg-blue-500/10 transition-colors"
              >
                <Download className="w-4 h-4" /> Download CV
              </motion.a>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex justify-center gap-6 mt-10 text-gray-400"
            >
              <a
                href="https://github.com/jaikumar-05"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="hover:text-white hover:-translate-y-1 transition"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/jai-kumar-531abb25b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="hover:text-white hover:-translate-y-1 transition"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:b.jai4067@gmail.com"
                aria-label="Send email"
                className="hover:text-white hover:-translate-y-1 transition"
              >
                <Mail className="w-6 h-6" />
              </a>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex justify-center mt-16 text-gray-500"
            >
              <button
                onClick={() => scrollTo("about")}
                aria-label="Scroll to about section"
              >
                <ChevronDown className="w-6 h-6 animate-bounce hover:text-white transition-colors" />
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Tech marquee ── */}
        <div
          className="border-y border-white/10 bg-white/[0.02] py-5 overflow-hidden"
          aria-hidden
        >
          <div className="flex w-max animate-marquee gap-10 text-gray-500 font-display text-lg font-semibold">
            {[
              ...FRONTEND_SKILLS,
              ...BACKEND_SKILLS,
              ...FRONTEND_SKILLS,
              ...BACKEND_SKILLS,
            ].map((s, i) => (
              <span key={i} className="whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── About ── */}
        <section id="about" className="px-6 md:px-20 pt-28 pb-20">
          <SectionTitle>About me</SectionTitle>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-40 blur-lg" />
                <div className="relative rounded-3xl overflow-hidden bg-black/40 shadow-xl">
                  <img
                    src={profileImg}
                    alt="Jaikumar, frontend developer based in Bengaluru"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.15}
              className="text-gray-300 text-base md:text-lg leading-relaxed space-y-6"
            >
              <p>
                I'm a front-end developer focused on high-quality interfaces
                with Vue.js, React.js, modern JavaScript and Tailwind CSS. I
                care about clarity, consistency and performance in everything I
                ship.
              </p>
              <p>
                Outside of work I explore new technologies, contribute to open
                source and share what I learn with the developer community.
              </p>
              <p>
                I write code that works and stays clean, maintainable and
                aligned with best practices.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {STATS.map(({ value, suffix, label }) => (
                  <div key={label}>
                    <div className="font-display text-3xl md:text-4xl font-bold text-white">
                      <Counter to={value} suffix={suffix} />
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 mt-1">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Value props ── */}
        <section className="px-6 md:px-20 pb-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 size={22} />,
                cls: "bg-blue-600/20 text-blue-400",
                title: "Clean code",
                desc: "Maintainable, scalable and well-documented code.",
              },
              {
                icon: <Palette size={22} />,
                cls: "bg-purple-600/20 text-purple-400",
                title: "Pixel perfect",
                desc: "Designs translated into flawless user interfaces.",
              },
              {
                icon: <Zap size={22} />,
                cls: "bg-blue-600/20 text-blue-400",
                title: "Performance",
                desc: "Optimised for speed and smooth user experiences.",
              },
            ].map(({ icon, cls, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-lg"
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mb-6 ${cls}`}
                  >
                    {icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="px-6 md:px-20 pb-28">
          <SectionTitle>Skills &amp; technologies</SectionTitle>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Frontend", items: FRONTEND_SKILLS },
              { title: "Backend", items: BACKEND_SKILLS },
              { title: "Tools & others", items: TOOLS_SKILLS },
              { title: "AI tools", items: AI_SKILLS },
              { title: "Currently learning", items: LEARNING_SKILLS },
            ].map(({ title, items }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8">
                  <h3 className="font-display text-xl font-bold text-white mb-6">
                    {title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="px-4 py-2 rounded-lg text-sm text-gray-200 bg-white/10 border border-white/10 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="px-6 md:px-10 pb-28">
          <SectionTitle>Featured projects</SectionTitle>

          <Reveal className="flex flex-wrap justify-center gap-2 mb-12">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-5 py-2 rounded-full text-sm transition-colors ${
                  filter === f ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </Reveal>

          <motion.div
            layout
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((p) => (
                <ProjectCard key={p.title} {...p} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="px-6 md:px-10 pb-28">
          <SectionTitle>Experience</SectionTitle>
          <div className="max-w-4xl mx-auto relative pl-8 md:pl-12">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute left-2 md:left-3 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-blue-500 to-purple-500"
            />
            <Reveal>
              <div className="relative">
                <span className="absolute -left-[2.35rem] md:-left-[3.1rem] top-8 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 ring-4 ring-[#020617]">
                  <Briefcase className="w-3 h-3 text-white" />
                </span>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="font-display text-xl font-bold text-white">
                      Frontend Developer
                    </h3>
                    <span className="text-sm text-gray-400 mt-2 md:mt-0">
                      Chadura Tech · Apr 2024 – Present
                    </span>
                  </div>
                  <p className="mt-4 text-gray-400 leading-relaxed">
                    Building responsive user interfaces with React, Vue.js and
                    Tailwind CSS. Integrating REST APIs and managing state with
                    Vuex and Pinia.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {[
                      "Vue.js (Composition & Options API)",
                      "ReactJS",
                      "Tailwind CSS",
                      "API Integration",
                      "Bootstrap",
                      "HTML/CSS",
                      "TypeScript",
                      "Next.js",
                      "JavaScript",
                      "Vuex",
                      "Pinia",
                    ].map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="px-6 md:px-10 pb-16">
          <SectionTitle sub="I'm open to new projects, ideas and opportunities.">
            Get in touch
          </SectionTitle>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
            <Reveal>
              <h3 className="font-display text-2xl font-bold text-white mb-8">
                Let&apos;s talk
              </h3>
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  text: "b.jai4067@gmail.com",
                  href: "mailto:b.jai4067@gmail.com",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Location",
                  text: "Bengaluru, India",
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  label: "LinkedIn",
                  text: "linkedin.com/in/jai-kumar",
                  href: "https://www.linkedin.com/in/jai-kumar-531abb25b/",
                },
              ].map(({ icon, label, text, href }) => (
                <div key={label} className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                    {icon}
                  </div>
                  <div>
                    <p className="text-white font-medium">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        {text}
                      </a>
                    ) : (
                      <p className="text-gray-400">{text}</p>
                    )}
                  </div>
                </div>
              ))}
            </Reveal>
            <Reveal delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>

          <div className="max-w-6xl mx-auto mt-20 border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Jaikumar. Built with React, Tailwind
            CSS and Framer Motion.
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
