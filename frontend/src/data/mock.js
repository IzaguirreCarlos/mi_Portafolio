// Portfolio mock data — Carlos Alberto Izaguirre
// All data is centralized here for easy editing and future backend integration

export const personalInfo = {
  name: "Carlos Alberto",
  lastName: "Izaguirre",
  role: "Junior Full Stack Developer",
  tagline: "Construyo experiencias digitales que impulsan negocios",
  description:
    "Construyo aplicaciones web completas — desde la base de datos hasta el pixel final. Django y Python en el back, JavaScript y Tailwind en el front. Si tienes una idea, yo la hago realidad.",
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
  { value: "6", label: "Proyectos Completados" },
  { value: "30+", label: "Clientes Satisfechos" },
  { value: "99%", label: "Tasa de Satisfacción" },
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Una tienda online que armé de cero — carrito, pagos, inventario y un panel admin para que el cliente maneje todo sin depender de nadie.",
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
      "Panel de métricas en tiempo real para un negocio que necesitaba ver sus números claros. Gráficas interactivas, reportes automáticos y filtros por fecha.",
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
      "Sistema interno para una empresa: inventario, facturación, usuarios con roles. Lo hice pensando en que cualquier empleado pudiera usarlo sin capacitación larga.",
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
      "Página corporativa que convierte visitantes en clientes. Diseño responsive, animaciones suaves y formulario de contacto conectado directo al correo del dueño.",
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
      "Arquitectura de microservicios con API bien documentada, auth con JWT y deploy automatizado. Hecha para escalar sin dolores de cabeza.",
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
      "Plataforma de cursos online con seguimiento de progreso, evaluaciones y certificados. El cliente quería algo tipo Udemy pero a su medida.",
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
    "Llevo más de 5 años haciendo desarrollo web y cada proyecto me emociona como el primero. Fuera de la compu, me vas a encontrar jugando soccer con los amigos — no importa el día, si hay cancha, ahí estoy.",
    "Me encanta conocer personas interesantes y tener esas pláticas que se extienden por horas sin darte cuenta. Soy super curioso — de los que se pierden investigando temas random a medianoche. Creo que eso es lo que me hace buen desarrollador: siempre quiero saber cómo funcionan las cosas por dentro.",
  ],
  highlights: [
    "Desarrollo web Full Stack end-to-end",
    "Arquitectura de software escalable",
    "Optimización de rendimiento y SEO",
    "Comunicación directa y transparente",
  ],
};

export const contactMessages = [];
