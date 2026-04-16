import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import { personalInfo } from '../../data/mock';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { toast } from '../../hooks/use-toast';

const Contact = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // MOCK: Simulates sending a message (no backend yet)
    setTimeout(() => {
      toast({
        title: 'Mensaje enviado',
        description: 'Gracias por contactarme. Te responderé pronto.',
      });
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 1500);
  };

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative py-12 md:py-16 bg-[#080808]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-8">
          <span className="text-sm font-mono text-emerald-400 mb-3 block">
            {'// Hablemos'}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contacto
          </h2>
          <p className="text-neutral-400 max-w-xl">
            ¿Tienes un proyecto en mente? Escríbeme y hagamos realidad tu idea.
          </p>
        </div>

        <div
          className={`grid md:grid-cols-5 gap-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-neutral-400 mb-2 block font-mono">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0c0c0c] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300 text-sm"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="text-sm text-neutral-400 mb-2 block font-mono">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0c0c0c] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300 text-sm"
                  placeholder="tu@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-neutral-400 mb-2 block font-mono">
                Mensaje
              </label>
              <textarea
                name="message"
                required
                rows={6}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0c0c0c] border border-neutral-800 rounded-lg text-white placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300 resize-none text-sm"
                placeholder="Cuéntame sobre tu proyecto..."
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 px-8 py-3.5 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]"
            >
              <Send size={16} />
              {sending ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>

          {/* Contact Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                <Mail size={18} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 text-sm">Email</h4>
                <p className="text-neutral-400 text-sm">
                  {personalInfo.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                <MapPin size={18} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 text-sm">
                  Ubicación
                </h4>
                <p className="text-neutral-400 text-sm">
                  {personalInfo.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
                <Phone size={18} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 text-sm">
                  Teléfono
                </h4>
                <p className="text-neutral-400 text-sm">
                  {personalInfo.phone}
                </p>
              </div>
            </div>

            {/* Decorative Info Card */}
            <div className="mt-8 p-6 bg-[#0c0c0c] rounded-xl border border-neutral-800/50">
              <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                <span className="text-emerald-400">{'>'}</span> Respondo en
                menos de <span className="text-emerald-400">24 horas</span>
              </p>
              <p className="text-sm text-neutral-400 font-mono leading-relaxed mt-2">
                <span className="text-emerald-400">{'>'}</span> Disponible para
                proyectos{' '}
                <span className="text-emerald-400">freelance</span>
              </p>
              <p className="text-sm text-neutral-400 font-mono leading-relaxed mt-2">
                <span className="text-emerald-400">{'>'}</span> Trabajo{' '}
                <span className="text-emerald-400">remoto</span> a nivel
                global
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
