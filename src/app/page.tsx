"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── Data ─── */

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;

const SKILLS = [
  { name: "Java", level: 85, category: "Programming" },
  { name: "C++", level: 75, category: "Programming" },
  { name: "HTML & CSS", level: 80, category: "Web" },
  { name: "Data Structures & Algorithms", level: 80, category: "Core" },
  { name: "Object-Oriented Programming", level: 85, category: "Core" },
  { name: "AI / ML (Basics)", level: 60, category: "Additional" },
  { name: "Data Visualization", level: 55, category: "Additional" },
] as const;

const EDUCATION = [
  {
    degree: "Bachelor's in Computer Applications / Computer Science",
    institution: "Galgotias University",
    period: "2023 – 2026",
    detail: "Focused on programming, data structures, and full-stack development.",
  },
  {
    degree: "Intermediate (BSEB)",
    institution: "Bihar School Examination Board",
    period: "Completed",
    detail: "Scored 61.2%",
  },
  {
    degree: "Secondary (CBSE)",
    institution: "Central Board of Secondary Education",
    period: "Completed",
    detail: "Scored 86.6%",
  },
] as const;

const PROJECTS = [
  {
    title: "University Management System",
    description:
      "A comprehensive Java-based system for managing university operations including student records, courses, and administrative tasks.",
    tags: ["Java", "OOP", "JDBC"],
    icon: "🎓",
  },
  {
    title: "Healthcare Mobile App",
    description:
      "A hospital finder application that helps users locate nearby healthcare facilities, view details, and access essential services.",
    tags: ["Mobile", "UI/UX", "Healthcare"],
    icon: "🏥",
  },
  {
    title: "Sentiment Analysis ML Model",
    description:
      "A machine learning model that analyzes text data to classify sentiment, built using Python-based ML libraries and data visualization.",
    tags: ["Python", "ML", "NLP"],
    icon: "🤖",
  },
] as const;

const CERTIFICATIONS = [
  {
    title: "Internship Completion Certificate",
    issuer: "EduSkills",
    year: "2025",
    icon: "🏆",
  },
  {
    title: "Course Completion Certificate",
    issuer: "EduSkills",
    year: "2025",
    icon: "📜",
  },
] as const;

/* ─── Icons (inline SVG) ─── */

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M17.72 17.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M17.72 6.28l1.06-1.06M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0112.478 3a9.72 9.72 0 109.274 12.002z"
      />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── Hook: dark mode ─── */

function getInitialDark(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem("theme");
    return stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
  } catch {
    return false;
  }
}

function useDarkMode() {
  const [dark, setDark] = useState(getInitialDark);

  /* Keep the DOM class in sync whenever `dark` changes */
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  return { dark, toggle };
}

/* ─── Hook: scroll spy ─── */

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return active;
}

/* ─── Components ─── */

function SectionHeading({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-3xl font-bold sm:text-4xl bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
        {children}
      </h2>
      {subtitle && <p className="mt-2 text-gray-500 dark:text-gray-400">{subtitle}</p>}
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
    </div>
  );
}

/* ─── Page ─── */

export default function Home() {
  const { dark, toggle } = useDarkMode();
  const activeSection = useActiveSection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* ── Navigation ── */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-lg dark:border-gray-800/50 dark:bg-gray-950/80">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#hero"
            className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent"
          >
            GKR
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 md:hidden"
            >
              {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200/50 bg-white/95 backdrop-blur-lg dark:border-gray-800/50 dark:bg-gray-950/95 md:hidden">
            <ul className="space-y-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      activeSection === link.href.slice(1)
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* ── Hero ── */}
        <section
          id="hero"
          className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-600/10" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-600/10" />

          <div className="relative z-10 text-center animate-fade-in-up">
            {/* Avatar placeholder */}
            <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-4xl font-bold text-white shadow-lg animate-pulse-glow sm:h-32 sm:w-32">
              GR
            </div>

            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-500 dark:text-indigo-400">
              Hello, I&apos;m
            </p>
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Gaurav Kumar Rai
            </h1>
            <p className="mb-4 text-xl font-medium text-gray-600 dark:text-gray-400 sm:text-2xl">
              Aspiring Software Developer
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <LocationIcon className="h-4 w-4" /> India
              </span>
              <span className="hidden sm:inline">•</span>
              <span>English &amp; Hindi</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
              >
                <MailIcon className="h-4 w-4" /> Get In Touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold transition-colors hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                View Projects
              </a>
            </div>

            <a
              href="#about"
              aria-label="Scroll to About section"
              className="mt-12 inline-block animate-bounce-slow"
            >
              <ArrowDownIcon className="h-6 w-6 text-gray-400" />
            </a>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="py-20 sm:py-28 px-4">
          <div className="mx-auto max-w-4xl">
            <SectionHeading subtitle="Who I am">About Me</SectionHeading>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Motivated and detail-oriented Computer Science student with strong foundational knowledge in
                programming, data structures, and web development. Passionate about learning new technologies,
                solving problems, and building practical projects. Actively developing skills in AI/ML and
                full-stack development.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center dark:border-gray-800 dark:bg-gray-800/50 card-hover">
                  <div className="mb-2 text-3xl">💡</div>
                  <h3 className="font-semibold">Problem Solver</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Strong analytical thinking &amp; DSA skills
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center dark:border-gray-800 dark:bg-gray-800/50 card-hover">
                  <div className="mb-2 text-3xl">🚀</div>
                  <h3 className="font-semibold">Fast Learner</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Passionate about new technologies
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 text-center dark:border-gray-800 dark:bg-gray-800/50 card-hover">
                  <div className="mb-2 text-3xl">🤝</div>
                  <h3 className="font-semibold">Team Player</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Strong communication &amp; collaboration
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="mb-3 font-semibold text-gray-700 dark:text-gray-300">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {["🎬 Movies (Cinephile)", "✈️ Traveling", "📚 Knowledge Sharing"].map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28 px-4">
          <div className="mx-auto max-w-4xl">
            <SectionHeading subtitle="What I work with">Technical Skills</SectionHeading>

            <div className="space-y-5">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 card-hover"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <span className="font-semibold">{skill.name}</span>
                      <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        {skill.category}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="skill-bar h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="mb-4 text-center text-lg font-semibold">Soft Skills</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["Problem-Solving", "Communication", "Detail-Oriented Mindset", "Team Collaboration", "Adaptability"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Education ── */}
        <section id="education" className="py-20 sm:py-28 px-4">
          <div className="mx-auto max-w-4xl">
            <SectionHeading subtitle="My academic journey">Education</SectionHeading>

            <div className="relative space-y-8 before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:to-cyan-400 sm:before:left-1/2 sm:before:-translate-x-px">
              {EDUCATION.map((edu, i) => (
                <div key={edu.degree} className={`relative flex ${i % 2 === 0 ? "sm:justify-start" : "sm:justify-end"}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-gray-950 sm:left-1/2" />

                  <div className={`ml-10 w-full sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:pr-0" : "sm:ml-auto sm:pl-0"}`}>
                    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 card-hover">
                      <span className="mb-1 inline-block rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                        {edu.period}
                      </span>
                      <h3 className="mt-2 font-bold">{edu.degree}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{edu.institution}</p>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{edu.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28 px-4">
          <div className="mx-auto max-w-4xl">
            <SectionHeading subtitle="Where I've worked">Experience</SectionHeading>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10 card-hover">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">AI/ML &amp; Full-Stack Java Intern</h3>
                  <p className="text-indigo-600 dark:text-indigo-400">EduSkills — Remote</p>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
                  Completed
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
                  Completed internship with <strong>100% task completion</strong> rate
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
                  Improved coding proficiency and problem-solving skills
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
                  Worked with AI/ML concepts and full-stack Java development
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-indigo-500" />
                  Gained hands-on experience in a remote professional environment
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="py-20 sm:py-28 px-4">
          <div className="mx-auto max-w-5xl">
            <SectionHeading subtitle="What I've built">Projects</SectionHeading>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <div
                  key={project.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all dark:border-gray-800 dark:bg-gray-900 card-hover"
                >
                  <div className="mb-4 text-4xl">{project.icon}</div>
                  <h3 className="text-lg font-bold">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Certifications ── */}
        <section id="certifications" className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28 px-4">
          <div className="mx-auto max-w-4xl">
            <SectionHeading subtitle="My achievements">Certifications</SectionHeading>

            <div className="grid gap-6 sm:grid-cols-2">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 card-hover"
                >
                  <div className="mb-3 text-4xl">{cert.icon}</div>
                  <h3 className="font-bold">{cert.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                  <span className="mt-3 inline-block rounded-full bg-indigo-50 px-3 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    {cert.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-20 sm:py-28 px-4">
          <div className="mx-auto max-w-4xl">
            <SectionHeading subtitle="Let's connect">Contact</SectionHeading>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact info */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
                <h3 className="text-xl font-bold">Get in Touch</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  I&apos;m always open to new opportunities, collaborations, and interesting conversations.
                  Feel free to reach out!
                </p>

                <div className="mt-6 space-y-4">
                  <a
                    href="mailto:gauravkumarrai@example.com"
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                      <MailIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium">gauravkumarrai@example.com</p>
                    </div>
                  </a>

                  <a
                    href="https://github.com/Mindedtiger07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      <GithubIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                      <p className="font-medium">Mindedtiger07</p>
                    </div>
                  </a>

                  <a
                    href="https://linkedin.com/in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      <LinkedInIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                      <p className="font-medium">Connect on LinkedIn</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                  const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                  window.location.href = `mailto:gauravkumarrai@example.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
                }}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8"
              >
                <h3 className="text-xl font-bold">Send a Message</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Fill out the form and I&apos;ll get back to you.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-950 px-4">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Gaurav Kumar Rai. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Mindedtiger07"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-200"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-200"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
