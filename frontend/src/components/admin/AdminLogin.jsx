import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { adminLogin, verifyToken } from '../../lib/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      verifyToken()
        .then(() => navigate('/admin/dashboard'))
        .catch(() => localStorage.removeItem('admin_token'));
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await adminLogin(form);
      localStorage.setItem('admin_token', res.data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-neutral-500 hover:text-emerald-400 transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} /> Volver al portafolio
        </button>

        <div className="bg-[#0e0e0e] rounded-2xl border border-neutral-800/40 p-8">
          <div className="text-center mb-8">
            <span className="font-mono text-lg font-bold text-white">{'<'}CA{' />'}</span>
            <p className="text-neutral-500 text-sm mt-2">Panel de Administración</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-neutral-400 mb-1.5 block font-mono">Usuario</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none transition-colors"
                  placeholder="admin"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-neutral-400 mb-1.5 block font-mono">Contraseña</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-500 text-black font-semibold rounded-lg hover:bg-emerald-400 transition-all text-sm disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
