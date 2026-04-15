import React from 'react';
import { Monitor, Server } from 'lucide-react';
import { skills } from '../../data/mock';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const SkillBar = ({ name, level, delay, isVisible }) => (
  <div
    className={`transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex justify-between mb-2">
      <span className="text-sm text-neutral-300 font-mono">{name}</span>
      <span className="text-sm text-emerald-400 font-mono">{level}%</span>
    </div>
    <div className="h-1.5 bg-neutral-800/80 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: isVisible ? `${level}%` : '0%',
          background: 'linear-gradient(90deg, #059669, #10B981, #34D399)',
          boxShadow: '0 0 12px rgba(16,185,129,0.3)',
          transitionDelay: `${delay + 200}ms`,
        }}
      />
    </div>
  </div>
);

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      id="habilidades"
      ref={ref}
      className="relative py-24 md:py-32 bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-sm font-mono text-emerald-400 mb-3 block">
            {'// Mis Habilidades'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-neutral-400 max-w-xl">
            Herramientas y tecnologías que utilizo para construir soluciones web
            de alta calidad.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Frontend */}
          <div className="bg-[#0a0a0a] rounded-xl border border-neutral-800/50 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Monitor size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Frontend</h3>
                <p className="text-xs text-neutral-500 font-mono">
                  Interfaces de usuario
                </p>
              </div>
            </div>
            <div className="space-y-5">
              {skills.frontend.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={i * 100}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="bg-[#0a0a0a] rounded-xl border border-neutral-800/50 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <Server size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Backend</h3>
                <p className="text-xs text-neutral-500 font-mono">
                  Lógica del servidor
                </p>
              </div>
            </div>
            <div className="space-y-5">
              {skills.backend.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={i * 100 + 300}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
