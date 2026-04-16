// Portfolio mock data — Carlos Alberto Izaguirre
// All data is centralized here for easy editing and future backend integration

export const personalInfo = {
  name: "Carlos Alberto",
  lastName: "Izaguirre",
  role: "Desarrollador Full Stack",
  tagline: "Construyo experiencias digitales que impulsan negocios",
  description:
    "Especializado en crear aplicaciones web modernas, escalables y de alto rendimiento utilizando Django, Python, JavaScript y tecnologías frontend de vanguardia. Transformo ideas en productos digitales que generan resultados reales.",
  email: "carlosizaguirres705@gmail.com",
  phone: "+1 470-529-4775",
  location: "Atlanta, Georgia",
  social: {
    github: "https://github.com/carlosizaguirre",
    linkedin: "https://linkedin.com/in/carlosizaguirre",
  },
};

export const stats = [
  { value: "5+", label: "Años de Experiencia" },
  { value: "50+", label: "Proyectos Completados" },
  { value: "30+", label: "Clientes Satisfechos" },
  { value: "99%", label: "Tasa de Satisfacción" },
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Plataforma de comercio electrónico completa con carrito de compras, sistema de pagos integrado, gestión de inventario y panel de administración.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["Django", "Python", "JavaScript", "Tailwind CSS", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Dashboard Analítico",
    description:
      "Panel de control interactivo con visualización de datos en tiempo real, reportes automatizados y métricas de rendimiento empresarial.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["Python", "Django REST", "JavaScript", "Bootstrap", "Chart.js"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Backend",
  },
  {
    id: 3,
    title: "Sistema de Gestión",
    description:
      "Sistema completo de gestión empresarial con módulos de inventario, facturación, reportes y control de usuarios con roles y permisos.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    technologies: ["Django", "Python", "HTML", "CSS", "Bootstrap"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Full Stack",
  },
  {
    id: 4,
    title: "Landing Page Corporativa",
    description:
      "Sitio web corporativo moderno con diseño responsive, animaciones suaves, formulario de contacto y optimización SEO completa.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Frontend",
  },
  {
    id: 5,
    title: "API REST Microservicios",
    description:
      "Arquitectura de microservicios con API REST documentada, autenticación JWT, rate limiting y despliegue automatizado con Docker.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    technologies: ["Django REST", "Python", "Docker", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Backend",
  },
  {
    id: 6,
    title: "Portal Educativo",
    description:
      "Plataforma de aprendizaje en línea con sistema de cursos, seguimiento de progreso, evaluaciones y certificaciones digitales.",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
    technologies: ["Django", "Python", "JavaScript", "Bootstrap", "CSS"],
    liveUrl: "#",
    githubUrl: "#",
    category: "Full Stack",
  },
];

export const skills = {
  frontend: [
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 92 },
    { name: "JavaScript", level: 88 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Bootstrap", level: 87 },
    { name: "Responsive Design", level: 93 },
  ],
  backend: [
    { name: "Python", level: 93 },
    { name: "Django", level: 91 },
    { name: "Django REST Framework", level: 88 },
    { name: "PostgreSQL", level: 85 },
    { name: "API REST", level: 90 },
    { name: "Git / GitHub", level: 88 },
  ],
};

export const aboutMe = {
  title: "Sobre Mí",
  paragraphs: [
    "Soy un desarrollador Full Stack con más de 5 años de experiencia creando soluciones web que impulsan el crecimiento de negocios. Mi enfoque combina código limpio, arquitectura sólida y diseño centrado en el usuario.",
    "Me especializo en el ecosistema Django/Python para el backend, construyendo APIs robustas y sistemas escalables. En el frontend, domino HTML, CSS, JavaScript, Tailwind CSS y Bootstrap para crear interfaces modernas y responsive.",
    "Mi objetivo es ser tu aliado tecnológico: entender tu visión, traducirla en código y entregar productos que superen tus expectativas.",
  ],
  highlights: [
    "Desarrollo web Full Stack end-to-end",
    "Arquitectura de software escalable",
    "Optimización de rendimiento y SEO",
    "Comunicación directa y transparente",
  ],
};

export const contactMessages = [];
