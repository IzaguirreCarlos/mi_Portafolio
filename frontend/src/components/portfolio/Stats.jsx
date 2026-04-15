import React from 'react';
import { stats } from '../../data/mock';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const Stats = () => {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section
      ref={ref}
      className="relative py-20 border-y border-neutral-800/30 bg-[#080808]"
    >
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-3xl md:text-5xl font-bold text-emerald-400 mb-3 font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-neutral-500 uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle gradient line bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </section>
  );
};

export default Stats;
