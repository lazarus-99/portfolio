import uagrmLogo from '../assets/uagrm-logo.png';

const translations = {
  en: {
    nav: {
      about: 'About',
      developer: 'Developer',
      teaching: 'Teaching',
    },
    a11y: {
      toggleTheme: 'Toggle color theme',
      toggleLanguage: 'Switch language',
      github: 'GitHub profile',
      linkedin: 'LinkedIn profile',
      email: 'Send an email',
      home: 'Go to home',
      menu: 'Menu',
    },
    hero: {
      meta: 'Full Stack Developer · Remote · Bolivia',
      headlineLine1: 'Database up,',
      headlineLine2Prefix: 'interface ',
      headlineTyped: 'down.',
      bio: "Six years building web applications end to end — schema, API, UI. I was also a teaching assistant for Database I and II at UAGRM, where I had to explain every decision to a room of people who asked why. That habit still shows up in the code.",
      cta: 'Get in touch',
    },
    about: {
      title: 'About me',
      role: 'Full Stack Developer',
      experience: '6 years of professional experience',
      bio: "I build web applications end to end, from the database up to the interface. For the past 6 years I've been working at Jalasoft, contributing to a variety of projects across many different technologies. I value every perspective and truly enjoy working as part of a team. I also love sharing knowledge, which is what led me to work as a teaching assistant at UAGRM.",
    },
    developer: {
      title: 'Developer',
      summaryTitle: 'Experience',
      summary: "Over the past 6 years I've worked on 5 professional projects, and I'm currently working on more. I've also started building personal projects of my own.",
      skillsTitle: 'Skills',
      work: {
        title: 'Selected work',
        intro: 'Client names stay private. The problems, my part in them, and the results are mine to share.',
        role: 'Role',
        stack: 'Stack',
        outcome: 'Outcome',
        projects: [
          {
            id: 'nodonet',
            label: 'In development',
            title: 'Nodonet',
            description: 'A platform for wireless internet service providers (WISPs) to manage their clients and network resources.',
            role: 'Design and build',
            stack: ['React', 'Vite', 'Material UI', 'Django'],
          },
          {
            id: 'portfolio',
            label: 'Personal',
            title: 'This portfolio',
            description: 'A bilingual, theme-aware single page with a spring-physics skills dock.',
            role: 'Design and build',
            stack: ['React', 'Vite', 'CSS', 'Motion'],
            link: { href: 'https://github.com/lazarus-99/portfolio', label: 'View the code' },
          },
        ],
      },
    },
    teaching: {
      title: 'Teaching',
      present: 'Present',
      entries: [
        {
          title: 'Teaching Assistant',
          school: 'Universidad Autónoma Gabriel René Moreno (UAGRM)',
          subjects: ['Database I', 'Database II'],
          dateStart: '03 · 2018',
          dateEnd: '12 · 2018',
          content: 'Ran lab sessions for groups of about 30 students in Database I and II, guiding them through designing and modeling databases with the entity-relationship and relational models, normalization and functional dependencies, then SQL, from advanced queries and stored procedures to transactions, security, optimization and administration. The courses ended in practical projects building information systems.',
          logo: uagrmLogo,
        },
      ],
    },
    contact: {
      title: 'Contact',
      headline: 'Open to work, and happy to help you.',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
    },
  },
  es: {
    nav: {
      about: 'Sobre mí',
      developer: 'Developer',
      teaching: 'Docencia',
    },
    a11y: {
      toggleTheme: 'Cambiar tema de color',
      toggleLanguage: 'Cambiar idioma',
      github: 'Perfil de GitHub',
      linkedin: 'Perfil de LinkedIn',
      email: 'Enviar un correo',
      home: 'Ir al inicio',
      menu: 'Menú',
    },
    hero: {
      meta: 'Desarrollador Full Stack · Remoto · Bolivia',
      headlineLine1: 'De la base de datos,',
      headlineLine2Prefix: 'a la ',
      headlineTyped: 'interfaz.',
      bio: 'Seis años construyendo aplicaciones web de punta a punta — esquema, API, interfaz. También fui auxiliar de docencia de Base de Datos I y II en la UAGRM, donde tenía que explicar cada decisión a un salón lleno de gente que preguntaba por qué. Ese hábito todavía se nota en el código.',
      cta: 'Escribime',
    },
    about: {
      title: 'Sobre mí',
      role: 'Desarrollador Full Stack',
      experience: '6 años de experiencia profesional',
      bio: 'Construyo aplicaciones web de punta a punta, desde la base de datos hasta la interfaz. Desde hace 6 años trabajo en Jalasoft, participando en distintos proyectos con una gran variedad de tecnologías. Valoro todas las opiniones y disfruto mucho trabajar en equipo. También me encanta compartir conocimiento, y eso me llevó a ser auxiliar de docencia en la UAGRM.',
    },
    developer: {
      title: 'Developer',
      summaryTitle: 'Experiencia',
      summary: 'En los últimos 6 años trabajé en 5 proyectos profesionales, y actualmente sigo trabajando en más. También empecé a construir proyectos personales.',
      skillsTitle: 'Habilidades',
      work: {
        title: 'Trabajos destacados',
        intro: 'Los nombres de los clientes son confidenciales; los problemas, mi rol y los resultados sí puedo compartirlos.',
        role: 'Rol',
        stack: 'Tecnologías',
        outcome: 'Resultado',
        projects: [
          {
            id: 'nodonet',
            label: 'En desarrollo',
            title: 'Nodonet',
            description: 'Una plataforma para proveedores de internet inalámbrico (WISP) que gestiona sus clientes y recursos de red.',
            role: 'Diseño y desarrollo',
            stack: ['React', 'Vite', 'Material UI', 'Django'],
          },
          {
            id: 'portfolio',
            label: 'Personal',
            title: 'Este portafolio',
            description: 'Una sola página bilingüe, con tema claro y oscuro y un dock de habilidades con física de resortes.',
            role: 'Diseño y desarrollo',
            stack: ['React', 'Vite', 'CSS', 'Motion'],
            link: { href: 'https://github.com/lazarus-99/portfolio', label: 'Ver el código' },
          },
        ],
      },
    },
    teaching: {
      title: 'Docencia',
      present: 'Presente',
      entries: [
        {
          title: 'Auxiliar de Docencia',
          school: 'Universidad Autónoma Gabriel René Moreno (UAGRM)',
          subjects: ['Base de Datos I', 'Base de Datos II'],
          dateStart: '03 · 2018',
          dateEnd: '12 · 2018',
          content: 'Dirigí laboratorios con grupos de unos 30 estudiantes en Base de Datos I y II, guiándolos en el diseño y modelado con los modelos entidad-relación y relacional, normalización y dependencias funcionales, y luego SQL, desde consultas avanzadas y procedimientos almacenados hasta transacciones, seguridad, optimización y administración. Los cursos cerraban con proyectos prácticos de sistemas de información.',
          logo: uagrmLogo,
        },
      ],
    },
    contact: {
      title: 'Contacto',
      headline: 'Disponible para trabajar, y feliz de ayudarte.',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub',
    },
  },
};

export default translations;
