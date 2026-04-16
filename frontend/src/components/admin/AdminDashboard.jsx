import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, FolderOpen, LogOut, Trash2, Plus, X, Save, RefreshCw,
} from 'lucide-react';
import {
  verifyToken, getMessages, deleteMessage,
  getProjects, createProject, updateProject, deleteProject,
} from '../../lib/api';

const emptyProject = { title: '', description: '', image: '', category: 'Full Stack', liveUrl: '#', githubUrl: '#' };

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [msgRes, projRes] = await Promise.all([getMessages(), getProjects()]);
      setMessages(msgRes.data);
      setProjects(projRes.data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyToken()
      .then(() => loadData())
      .catch(() => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
      });
  }, [navigate, loadData]);

  const logout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin');
  };

  const handleDeleteMsg = async (id) => {
    await deleteMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleDeleteProject = async (id) => {
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const openEditForm = (project) => {
    setForm({ title: project.title, description: project.description, image: project.image, category: project.category, liveUrl: project.liveUrl, githubUrl: project.githubUrl });
    setEditingId(project.id);
    setShowForm(true);
  };

  const openNewForm = () => {
    setForm(emptyProject);
    setEditingId(null);
    setShowForm(true);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (editingId) {
      const res = await updateProject(editingId, form);
      setProjects((prev) => prev.map((p) => (p.id === editingId ? res.data : p)));
    } else {
      const res = await createProject(form);
      setProjects((prev) => [res.data, ...prev]);
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyProject);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <RefreshCw size={24} className="text-emerald-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Header */}
      <header className="border-b border-neutral-800/40 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-lg font-bold text-white">{'<'}CA{' />'}</span>
            <span className="text-xs text-neutral-500 font-mono">Admin</span>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-neutral-500 hover:text-red-400 transition-colors text-sm">
            <LogOut size={16} /> Salir
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all ${
              tab === 'messages'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-neutral-500 border border-neutral-800 hover:text-neutral-300'
            }`}
          >
            <Mail size={14} /> Mensajes ({messages.length})
          </button>
          <button
            onClick={() => setTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono transition-all ${
              tab === 'projects'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-neutral-500 border border-neutral-800 hover:text-neutral-300'
            }`}
          >
            <FolderOpen size={14} /> Proyectos ({projects.length})
          </button>
        </div>

        {/* Messages Tab */}
        {tab === 'messages' && (
          <div className="space-y-3">
            {messages.length === 0 && (
              <p className="text-neutral-500 text-sm text-center py-12">No hay mensajes todavía</p>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="bg-[#0e0e0e] rounded-xl border border-neutral-800/40 p-5 flex justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white font-medium text-sm">{msg.name}</span>
                    <span className="text-emerald-400 text-xs font-mono">{msg.email}</span>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">{msg.message}</p>
                  <span className="text-neutral-600 text-xs font-mono mt-2 block">
                    {new Date(msg.created_at).toLocaleString('es')}
                  </span>
                </div>
                <button onClick={() => handleDeleteMsg(msg.id)} className="text-neutral-600 hover:text-red-400 transition-colors shrink-0 self-start">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {tab === 'projects' && (
          <div>
            <button
              onClick={openNewForm}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg text-sm hover:bg-emerald-400 transition-all mb-6"
            >
              <Plus size={16} /> Agregar Proyecto
            </button>

            {/* Project Form */}
            {showForm && (
              <div className="bg-[#0e0e0e] rounded-xl border border-emerald-500/20 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium text-sm">{editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}</span>
                  <button onClick={() => { setShowForm(false); setEditingId(null); }} className="text-neutral-500 hover:text-white">
                    <X size={18} />
                  </button>
                </div>
                <form onSubmit={handleSaveProject} className="grid sm:grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Título"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="px-3 py-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none"
                  />
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="px-3 py-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white text-sm focus:border-emerald-500/50 focus:outline-none"
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                  </select>
                  <textarea
                    required
                    placeholder="Descripción"
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="sm:col-span-2 px-3 py-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none resize-none"
                  />
                  <input
                    placeholder="URL de imagen"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="px-3 py-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none"
                  />
                  <input
                    placeholder="URL demo"
                    value={form.liveUrl}
                    onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                    className="px-3 py-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none"
                  />
                  <input
                    placeholder="URL GitHub"
                    value={form.githubUrl}
                    onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                    className="px-3 py-2 bg-[#0a0a0a] border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-600 focus:border-emerald-500/50 focus:outline-none"
                  />
                  <button type="submit" className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg text-sm hover:bg-emerald-400 transition-all">
                    <Save size={14} /> {editingId ? 'Guardar Cambios' : 'Crear Proyecto'}
                  </button>
                </form>
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.id} className="bg-[#0e0e0e] rounded-xl border border-neutral-800/40 p-4 flex items-center gap-4">
                  {p.image && (
                    <img src={p.image} alt={p.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-medium truncate">{p.title}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">{p.category}</span>
                    </div>
                    <p className="text-neutral-500 text-xs truncate mt-0.5">{p.description}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openEditForm(p)} className="text-neutral-500 hover:text-emerald-400 transition-colors text-xs font-mono border border-neutral-800 px-2.5 py-1 rounded-lg hover:border-emerald-500/30">
                      Editar
                    </button>
                    <button onClick={() => handleDeleteProject(p.id)} className="text-neutral-500 hover:text-red-400 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
