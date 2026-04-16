import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const api = axios.create({ baseURL: API });

// Add auth token to protected requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public
export const getProjects = () => api.get('/projects');
export const sendContact = (data) => api.post('/contact', data);

// Admin Auth
export const adminLogin = (data) => api.post('/admin/login', data);
export const verifyToken = () => api.get('/admin/verify');

// Admin Messages
export const getMessages = () => api.get('/admin/messages');
export const deleteMessage = (id) => api.delete(`/admin/messages/${id}`);

// Admin Projects
export const createProject = (data) => api.post('/admin/projects', data);
export const updateProject = (id, data) => api.put(`/admin/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/admin/projects/${id}`);
