import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../../data/mock';

const PROFILE_IMAGE = 'https://customer-assets.emergentagent.com/job_fullstack-showcase-103/artifacts/u5wzqjtg_20200425_160851_Original.JPG';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = personalInfo.role;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) clearInterval(timer);
    }, 80);
    return () => clearInterval(timer);
  }, [fullText]);

  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(cursorTimer);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.07),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.04),transparent_50%)]" />

      {/* Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #10B981 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Decorative Glow Orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
          {/* Left: Content */}
          <div className="flex-1">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-10 rounded-full border border-emerald-500/20 bg-emerald-500/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-mono text-emerald-400">
                Disponible para proyectos
              </span>
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              {personalInfo.name}
              <span className="block text-emerald-400 mt-1">
                {personalInfo.lastName}
              </span>
            </h1>

            {/* Typing Role */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-emerald-500/50 font-mono text-xl">{'>'}</span>
              <span className="text-xl md:text-2xl text-neutral-300 font-mono">
                {displayText}
                <span
                  className={`text-emerald-400 transition-opacity duration-100 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  _
                </span>
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-neutral-400 leading-relaxed mb-10 max-w-xl">
              {personalInfo.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => scrollTo('#proyectos')}
                className="px-8 py-3.5 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] active:scale-[0.97]"
              >
                Ver Proyectos
              </button>
              <button
                onClick={() => scrollTo('#contacto')}
                className="px-8 py-3.5 border border-neutral-700 text-neutral-300 rounded-lg hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-300 active:scale-[0.97]"
              >
                Contáctame
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-emerald-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-600 hover:text-emerald-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-neutral-600 hover:text-emerald-400 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <div className="w-12 h-px bg-neutral-800" />
              <span className="text-xs text-neutral-600 font-mono">
                {personalInfo.location}
              </span>
            </div>
          </div>

          {/* Right: Profile Photo */}
          <div className="shrink-0 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden border-2 border-neutral-800/50 shadow-[0_0_60px_rgba(16,185,129,0.08)]">
                <img
                  src={PROFILE_IMAGE}
                  alt="Carlos Alberto Izaguirre"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Decorative border glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-emerald-500/10 -z-10 blur-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-neutral-600 font-mono">scroll</span>
        <ArrowDown size={16} className="text-emerald-500/40 animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
