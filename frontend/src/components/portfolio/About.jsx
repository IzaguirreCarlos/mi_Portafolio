import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { aboutMe, personalInfo } from '../../data/mock';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const About = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section
      id="sobre-mi"
      ref={ref}
      className="relative py-24 md:py-32 bg-[#080808]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="text-sm font-mono text-emerald-400 mb-3 block">
              {'// Conóceme'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              {aboutMe.title}
            </h2>

            <div className="space-y-4 mb-10">
              {aboutMe.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-neutral-400 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="space-y-3">
              {aboutMe.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-400 flex-shrink-0"
                  />
                  <span className="text-neutral-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Code Terminal */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="bg-[#0c0c0c] rounded-xl border border-neutral-800/50 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0a] border-b border-neutral-800/50">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-neutral-600 font-mono">
                  sobre_mi.py
                </span>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-[1.85] overflow-x-auto">
                <div>
                  <span className="text-purple-400">class</span>{' '}
                  <span className="text-emerald-400">Developer</span>
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
                  <span className="text-white">nombre</span>{' '}
                  <span className="text-neutral-500">=</span>{' '}
                  <span className="text-emerald-300">
                    "{personalInfo.name}"
                  </span>
                </div>
                <div className="ml-8">
                  <span className="text-orange-400">self</span>
                  <span className="text-neutral-500">.</span>
                  <span className="text-white">rol</span>{' '}
                  <span className="text-neutral-500">=</span>{' '}
                  <span className="text-emerald-300">
                    "Full Stack Dev"
                  </span>
                </div>
                <div className="ml-8 mt-1">
                  <span className="text-orange-400">self</span>
                  <span className="text-neutral-500">.</span>
                  <span className="text-white">frontend</span>{' '}
                  <span className="text-neutral-500">=</span>{' '}
                  <span className="text-neutral-500">[</span>
                </div>
                <div className="ml-12">
                  <span className="text-emerald-300">"HTML"</span>
                  <span className="text-neutral-500">,</span>{' '}
                  <span className="text-emerald-300">"CSS"</span>
                  <span className="text-neutral-500">,</span>{' '}
                  <span className="text-emerald-300">"JS"</span>
                  <span className="text-neutral-500">,</span>
                </div>
                <div className="ml-12">
                  <span className="text-emerald-300">"Tailwind"</span>
                  <span className="text-neutral-500">,</span>{' '}
                  <span className="text-emerald-300">"Bootstrap"</span>
                </div>
                <div className="ml-8">
                  <span className="text-neutral-500">]</span>
                </div>
                <div className="ml-8 mt-1">
                  <span className="text-orange-400">self</span>
                  <span className="text-neutral-500">.</span>
                  <span className="text-white">backend</span>{' '}
                  <span className="text-neutral-500">=</span>{' '}
                  <span className="text-neutral-500">[</span>
                </div>
                <div className="ml-12">
                  <span className="text-emerald-300">"Python"</span>
                  <span className="text-neutral-500">,</span>{' '}
                  <span className="text-emerald-300">"Django"</span>
                  <span className="text-neutral-500">,</span>
                </div>
                <div className="ml-12">
                  <span className="text-emerald-300">"REST API"</span>
                  <span className="text-neutral-500">,</span>{' '}
                  <span className="text-emerald-300">"PostgreSQL"</span>
                </div>
                <div className="ml-8">
                  <span className="text-neutral-500">]</span>
                </div>
                <div className="mt-3 ml-4">
                  <span className="text-purple-400">def</span>{' '}
                  <span className="text-sky-400">disponible</span>
                  <span className="text-neutral-500">(</span>
                  <span className="text-orange-400">self</span>
                  <span className="text-neutral-500">):</span>
                </div>
                <div className="ml-8">
                  <span className="text-purple-400">return</span>{' '}
                  <span className="text-emerald-400">True</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
