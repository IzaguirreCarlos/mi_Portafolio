import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { personalInfo } from '../../data/mock';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#050505] border-t border-neutral-800/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="font-mono text-lg font-bold text-white hover:text-emerald-400 transition-colors duration-300"
          >
            {'<'}CA{' />'}
          </button>

          {/* Social */}
          <div className="flex items-center gap-6">
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-emerald-400 transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-emerald-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-neutral-600 hover:text-emerald-400 transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-neutral-600 flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} Carlos Izaguirre. Hecho con
            <Heart size={14} className="text-emerald-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
