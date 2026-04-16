import React from 'react';
import {
  Code2,
  Paintbrush,
  FileCode2,
  Wind,
  LayoutGrid,
  Smartphone,
  Terminal,
  Server,
  Database,
  HardDrive,
  Globe,
  GitBranch,
  MapPin,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { stats, aboutMe, personalInfo } from '../../data/mock';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const frontendSkills = [
  { name: 'HTML5', icon: Code2 },
  { name: 'CSS3', icon: Paintbrush },
  { name: 'JavaScript', icon: FileCode2 },
  { name: 'Tailwind', icon: Wind },
  { name: 'Bootstrap', icon: LayoutGrid },
  { name: 'Responsive', icon: Smartphone },
];

const backendSkills = [
  { name: 'Python', icon: Terminal },
  { name: 'Django', icon: Server },
  { name: 'Django REST', icon: Database },
  { name: 'PostgreSQL', icon: HardDrive },
  { name: 'API REST', icon: Globe },
  { name: 'Git', icon: GitBranch },
];

const BentoCard = ({ children, className = '', delay = 0, isVisible }) => (
  <div
    className={`bg-[#0e0e0e] rounded-2xl border border-neutral-800/40 p-6 transition-all duration-700 hover:border-emerald-500/20 hover:shadow-[0_0_40px_rgba(16,185,129,0.04)] ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    } ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const StatCard = ({ stat, delay, isVisible }) => (
  <BentoCard delay={delay} isVisible={isVisible} className="flex flex-col items-center justify-center text-center min-h-[140px]">
    <div className="text-3xl md:text-4xl font-bold text-emerald-400 font-mono mb-2">
      {stat.value}
    </div>
    <div className="text-xs text-neutral-500 uppercase tracking-widest leading-tight">
      {stat.label}
    </div>
  </BentoCard>
);

const BentoGrid = () => {
  const [ref, isVisible] = useScrollAnimation(0.08);

  return (
    <section id="sobre-mi" ref={ref} className="relative py-20 md:py-28 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <div className="mb-12">
          <span className="text-sm font-mono text-emerald-400 mb-3 block">
            {'// Quien soy'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            En resumen
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* About Me - Large Card */}
          <BentoCard
            delay={0}
            isVisible={isVisible}
            className="sm:col-span-2 lg:row-span-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Briefcase size={18} className="text-emerald-400" />
                <span className="text-sm font-mono text-emerald-400">
                  {aboutMe.title}
                </span>
              </div>
              <div className="space-y-4 mb-6">
                {aboutMe.paragraphs.map((p, i) => (
                  <p key={i} className="text-neutral-400 leading-relaxed text-[15px]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-2.5 pt-4 border-t border-neutral-800/40">
              {aboutMe.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-neutral-400 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Stat Cards */}
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              delay={(i + 1) * 80}
              isVisible={isVisible}
            />
          ))}

          {/* Frontend Skills */}
          <BentoCard delay={450} isVisible={isVisible} className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Code2 size={18} className="text-emerald-400" />
              <span className="text-sm font-mono text-emerald-400">Frontend</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {frontendSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2.5 py-3 px-2 rounded-xl bg-[#0a0a0a] border border-neutral-800/30 hover:border-emerald-500/30 transition-colors duration-300 group"
                  >
                    <Icon
                      size={22}
                      className="text-neutral-500 group-hover:text-emerald-400 transition-colors duration-300"
                    />
                    <span className="text-xs text-neutral-400 font-mono text-center">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </BentoCard>

          {/* Backend Skills */}
          <BentoCard delay={550} isVisible={isVisible} className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Server size={18} className="text-emerald-400" />
              <span className="text-sm font-mono text-emerald-400">Backend</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {backendSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center gap-2.5 py-3 px-2 rounded-xl bg-[#0a0a0a] border border-neutral-800/30 hover:border-emerald-500/30 transition-colors duration-300 group"
                  >
                    <Icon
                      size={22}
                      className="text-neutral-500 group-hover:text-emerald-400 transition-colors duration-300"
                    />
                    <span className="text-xs text-neutral-400 font-mono text-center">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </BentoCard>

          {/* Location Card */}
          <BentoCard delay={650} isVisible={isVisible} className="flex flex-col items-center justify-center text-center">
            <MapPin size={24} className="text-emerald-400 mb-3" />
            <span className="text-white font-medium text-sm mb-1">
              {personalInfo.location}
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              Trabajo remoto global
            </span>
          </BentoCard>

          {/* Code Terminal Card */}
          <BentoCard delay={700} isVisible={isVisible} className="sm:col-span-2 lg:col-span-3 overflow-hidden !p-0">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-5 py-3 bg-[#0a0a0a] border-b border-neutral-800/40">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-neutral-600 font-mono">
                perfil.py
              </span>
            </div>
            <div className="p-5 font-mono text-sm leading-[1.8] overflow-x-auto">
              <div>
                <span className="text-purple-400">class</span>{' '}
                <span className="text-emerald-400">SeniorDev</span>
                <span className="text-neutral-500">:</span>
              </div>
              <div className="ml-4">
                <span className="text-purple-400">def</span>{' '}
                <span className="text-sky-400">__init__</span>
                <span className="text-neutral-500">(</span>
                <span className="text-orange-400">self</span>
                <span className="text-neutral-500">):</span>
              </div>
              <div className="ml-8">
                <span className="text-orange-400">self</span>
                <span className="text-neutral-500">.</span>
                <span className="text-white">stack</span>{' '}
                <span className="text-neutral-500">=</span>{' '}
                <span className="text-neutral-500">{`{`}</span>
              </div>
              <div className="ml-12">
                <span className="text-emerald-300">"front"</span>
                <span className="text-neutral-500">:</span>{' '}
                <span className="text-neutral-500">[</span>
                <span className="text-emerald-300">"HTML"</span>
                <span className="text-neutral-500">,</span>{' '}
                <span className="text-emerald-300">"CSS"</span>
                <span className="text-neutral-500">,</span>{' '}
                <span className="text-emerald-300">"JS"</span>
                <span className="text-neutral-500">,</span>{' '}
                <span className="text-emerald-300">"Tailwind"</span>
                <span className="text-neutral-500">],</span>
              </div>
              <div className="ml-12">
                <span className="text-emerald-300">"back"</span>
                <span className="text-neutral-500">:</span>{' '}
                <span className="text-neutral-500">[</span>
                <span className="text-emerald-300">"Python"</span>
                <span className="text-neutral-500">,</span>{' '}
                <span className="text-emerald-300">"Django"</span>
                <span className="text-neutral-500">,</span>{' '}
                <span className="text-emerald-300">"REST"</span>
                <span className="text-neutral-500">,</span>{' '}
                <span className="text-emerald-300">"PostgreSQL"</span>
                <span className="text-neutral-500">]</span>
              </div>
              <div className="ml-8">
                <span className="text-neutral-500">{`}`}</span>
              </div>
              <div className="ml-8 mt-1">
                <span className="text-orange-400">self</span>
                <span className="text-neutral-500">.</span>
                <span className="text-white">disponible</span>{' '}
                <span className="text-neutral-500">=</span>{' '}
                <span className="text-emerald-400">True</span>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
