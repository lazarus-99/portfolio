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
    },
    hero: {
      meta: 'Full Stack Developer · Bolivia',
      headlineLine1: 'Database up,',
      headlineLine2Prefix: 'interface ',
      headlineTyped: 'down.',
      bio: "Five years building web applications end to end — schema, API, UI. I also teach Database I and II at UAGRM, which means I've had to explain every decision I make to a room of people who will ask why. That habit shows up in the code.",
      cta: 'Get in touch',
    },
    about: {
      title: 'About me',
      role: 'Full Stack Developer',
      experience: '5 years of professional experience',
      bio: 'I build web applications end to end, from the database up to the interface. Alongside client work, I also teach database courses at university, which keeps me equally comfortable explaining a concept as I am implementing one.',
    },
    developer: {
      title: 'Developer',
      summaryTitle: 'Experience',
      summary: "Over the past 5 years I've worked on 5 professional projects, and I'm currently working on more. I've started putting together personal projects as well — that section is still taking shape, so check back soon.",
      skillsTitle: 'Skills',
      skills: {
        languages: 'Languages',
        databases: 'Databases',
        cloud: 'Cloud',
      },
      personalProjectsTitle: 'Personal projects',
      personalProjectsNote: "In progress — I'm building out my own projects and will showcase them here soon.",
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
          content: 'Training in the design, modeling, and management of databases, covering the entity-relationship model, the relational model, normalization, functional dependencies, and SQL. Builds skills in advanced queries, stored procedures, transaction management, security, optimization, and database administration, applying these concepts to practical projects focused on information systems.',
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
    },
    hero: {
      meta: 'Desarrollador Full Stack · Bolivia',
      headlineLine1: 'De la base de datos,',
      headlineLine2Prefix: 'a la ',
      headlineTyped: 'interfaz.',
      bio: 'Cinco años construyendo aplicaciones web de punta a punta — esquema, API, interfaz. También doy clases de Base de Datos I y II en la UAGRM, así que estoy acostumbrado a explicar cada decisión que tomo a un salón lleno de gente que pregunta por qué. Ese hábito se nota en el código.',
      cta: 'Escribime',
    },
    about: {
      title: 'Sobre mí',
      role: 'Desarrollador Full Stack',
      experience: '5 años de experiencia profesional',
      bio: 'Construyo aplicaciones web de punta a punta, desde la base de datos hasta la interfaz. Además del trabajo con clientes, también soy docente auxiliar de materias de bases de datos en la universidad, así que estoy tan cómodo explicando un concepto como implementándolo.',
    },
    developer: {
      title: 'Developer',
      summaryTitle: 'Experiencia',
      summary: 'En los últimos 5 años trabajé en 5 proyectos profesionales, y actualmente sigo trabajando en más. También empecé a armar proyectos personales — esa sección todavía está tomando forma, vuelve pronto.',
      skillsTitle: 'Habilidades',
      skills: {
        languages: 'Lenguajes',
        databases: 'Bases de datos',
        cloud: 'Cloud',
      },
      personalProjectsTitle: 'Proyectos personales',
      personalProjectsNote: 'En proceso — estoy armando mis propios proyectos y los voy a mostrar acá pronto.',
    },
    teaching: {
      title: 'Docencia',
      present: 'Presente',
      entries: [
        {
          title: 'Auxiliar de Docencia',
          school: 'Universidad Autónoma Gabriel René Moreno (UAGRM)',
          subjects: ['Base de Datos I', 'Base de Datos II'],
          dateStart: '03 - 2018',
          dateEnd: '12 - 2018',
          content: 'Formación en el diseño, modelado y gestión de bases de datos, abordando el modelo entidad-relación, el modelo relacional, normalización, dependencias funcionales y lenguaje SQL. Se desarrollan conocimientos en consultas avanzadas, procedimientos almacenados, gestión de transacciones, seguridad, optimización y administración de bases de datos, aplicando estos conceptos en proyectos prácticos orientados al desarrollo de sistemas de información.',
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
