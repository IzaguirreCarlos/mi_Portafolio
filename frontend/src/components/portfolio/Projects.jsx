import React, { useState, useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getProjects } from '../../lib/api';

const ProjectCard = ({ project, index, isVisible }) => (
  <div
    className={`group relative bg-[#111111] rounded-xl overflow-hidden border border-neutral-800/50 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,185,129,0.06)] ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    }`}
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    {/* Image */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
      <div className="absolute top-3 right-3">
        <span className="px-2.5 py-1 text-xs font-mono bg-[#0a0a0a]/80 backdrop-blur-sm text-emerald-400 rounded-md border border-emerald-500/20">
          {project.category}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-6">
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-sm text-neutral-400 leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-neutral-800/50">
        <a
          href={project.liveUrl}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-emerald-400 transition-colors duration-300"
        >
          <ExternalLink size={14} />
          <span>Demo</span>
        </a>
        <a
          href={project.githubUrl}
          className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-emerald-400 transition-colors duration-300"
        >
          <Github size={14} />
          <span>Código</span>
        </a>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [filter, setFilter] = useState('Todos');
  const [projects, setProjects] = useState([]);
  const categories = ['Todos', 'Full Stack', 'Frontend', 'Backend'];

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch(() => {});
  }, []);

  const filteredProjects =
    filter === 'Todos'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section
      id="proyectos"
      ref={ref}
      className="relative py-12 md:py-16 bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-sm font-mono text-emerald-400 mb-2 block">
            {'// Mis Proyectos'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trabajo Reciente
          </h2>
          <p className="text-neutral-400 max-w-xl">
            Una selección de proyectos que demuestran mi experiencia en
            desarrollo web Full Stack.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 font-mono ${
                filter === cat
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  : 'text-neutral-500 border border-neutral-800 hover:border-neutral-600 hover:text-neutral-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
