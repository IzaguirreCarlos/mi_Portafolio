import React from 'react';
import {
  MapPin,
  Briefcase,
  CheckCircle2,
  Smartphone,
  Globe,
  Code2,
  Server,
} from 'lucide-react';
import { stats, aboutMe, personalInfo } from '../../data/mock';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const frontendSkills = [
  { name: 'HTML5', icon: `${DEVICON}/html5/html5-original.svg` },
  { name: 'CSS3', icon: `${DEVICON}/css3/css3-original.svg` },
  { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg` },
  { name: 'Tailwind', icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: 'Bootstrap', icon: `${DEVICON}/bootstrap/bootstrap-original.svg` },
  { name: 'Responsive', icon: null },
];

const backendSkills = [
  { name: 'Python', icon: `${DEVICON}/python/python-original.svg` },
  { name: 'Django', icon: `${DEVICON}/django/django-plain.svg` },
  { name: 'Django REST', icon: `${DEVICON}/djangorest/djangorest-original.svg` },
  { name: 'PostgreSQL', icon: `${DEVICON}/postgresql/postgresql-original.svg` },
  { name: 'API REST', icon: null },
  { name: 'Git', icon: `${DEVICON}/git/git-original.svg` },
];

const BentoCard = ({ children, className = '', delay = 0, isVisible }) => (
  <div
    className={`bg-[#0e0e0e] rounded-2xl border border-neutral-800/40 p-5 transition-all duration-700 hover:border-emerald-500/20 hover:shadow-[0_0_40px_rgba(16,185,129,0.04)] ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    } ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const StatCard = ({ stat, delay, isVisible }) => (
  <BentoCard delay={delay} isVisible={isVisible} className="flex flex-col items-center justify-center text-center min-h-[120px]">
    <div className="text-3xl md:text-4xl font-bold text-emerald-400 font-mono mb-2">
      {stat.value}
    </div>
    <div className="text-xs text-neutral-500 uppercase tracking-widest leading-tight">
      {stat.label}
    </div>
  </BentoCard>
);

const SkillIcon = ({ skill }) => {
  if (skill.icon) {
    return (
      <img
        src={skill.icon}
        alt={skill.name}
        className="w-8 h-8 object-contain"
        loading="lazy"
      />
    );
  }
  // Fallback lucide icons for skills without a logo
  if (skill.name === 'Responsive') return <Smartphone size={28} className="text-emerald-400" />;
  if (skill.name === 'API REST') return <Globe size={28} className="text-emerald-400" />;
  return <Code2 size={28} className="text-neutral-400" />;
};

const PROFILE_IMAGE = 'https://customer-assets.emergentagent.com/job_fullstack-showcase-103/artifacts/u5wzqjtg_20200425_160851_Original.JPG';

const BentoGrid = () => {
  const [ref, isVisible] = useScrollAnimation(0.08);

  return (
    <section id="sobre-mi" ref={ref} className="relative py-10 md:py-14 bg-[#050505]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <div className="mb-6">
          <span className="text-sm font-mono text-emerald-400 mb-2 block">
            {'// Quien soy'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            En resumen
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

          {/* Profile Photo Card */}
          <BentoCard
            delay={0}
            isVisible={isVisible}
            className="sm:col-span-2 lg:col-span-2 lg:row-span-2 !p-0 overflow-hidden"
          >
            <div className="relative w-full h-full min-h-[320px]">
              <img
                src={PROFILE_IMAGE}
                alt="Carlos Alberto Izaguirre"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-sm font-mono text-emerald-400">Carlos Alberto</span>
                <p className="text-xs text-neutral-400 mt-1">Junior Full Stack Developer</p>
              </div>
            </div>
          </BentoCard>

          {/* Stat Cards */}

          {/* About Me Card */}
          <BentoCard
            delay={500}
            isVisible={isVisible}
            className="sm:col-span-2 lg:col-span-2 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={16} className="text-emerald-400" />
                <span className="text-sm font-mono text-emerald-400">
                  {aboutMe.title}
                </span>
              </div>
              <div className="space-y-3 mb-5">
                {aboutMe.paragraphs.map((p, i) => (
                  <p key={i} className="text-neutral-400 leading-relaxed text-[14px]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-2 pt-3 border-t border-neutral-800/40">
              {aboutMe.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-neutral-400 text-[13px]">{item}</span>
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
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={16} className="text-emerald-400" />
              <span className="text-sm font-mono text-emerald-400">Frontend</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {frontendSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl bg-[#0a0a0a] border border-neutral-800/30 hover:border-emerald-500/30 transition-colors duration-300"
                >
                  <SkillIcon skill={skill} />
                  <span className="text-[11px] text-neutral-400 font-mono text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Backend Skills */}
          <BentoCard delay={550} isVisible={isVisible} className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Server size={16} className="text-emerald-400" />
              <span className="text-sm font-mono text-emerald-400">Backend</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {backendSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl bg-[#0a0a0a] border border-neutral-800/30 hover:border-emerald-500/30 transition-colors duration-300"
                >
                  <SkillIcon skill={skill} />
                  <span className="text-[11px] text-neutral-400 font-mono text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Location Card */}
          <BentoCard delay={650} isVisible={isVisible} className="flex flex-col items-center justify-center text-center">
            <MapPin size={22} className="text-emerald-400 mb-2" />
            <span className="text-white font-medium text-sm mb-1">
              {personalInfo.location}
            </span>
            <span className="text-[11px] text-neutral-500 font-mono">
              Trabajo remoto global
            </span>
          </BentoCard>

          {/* Code Terminal Card */}
          <BentoCard delay={700} isVisible={isVisible} className="sm:col-span-2 lg:col-span-3 overflow-hidden !p-0">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a0a0a] border-b border-neutral-800/40">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-neutral-600 font-mono">
                perfil.py
              </span>
            </div>
            <div className="p-4 font-mono text-sm leading-[1.7] overflow-x-auto">
              <div>
                <span className="text-purple-400">class</span>{' '}
                <span className="text-emerald-400">JuniorDev</span>
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
