// Mock data for portfolio
export const personalInfo = {
  name: "Jitmohan Raj",
  title: "Software Engineer",
  tagline: "Building scalable backend systems with modern technologies",
  bio: "Passionate backend developer with 4+ years of experience in designing and developing robust, scalable server-side applications. Specialized in Node.js ecosystem with expertise in microservices architecture, API development, and cloud technologies.",
  email: "mohanjeet737@gmail.com",
  phone: "+91 7992244318",
  location: "Bangalore, India",
  resume: "/resume.pdf"
};

export const socialLinks = {
  github: "https://github.com/jit737",
  linkedin: "https://www.linkedin.com/in/jitmohan-raj-65ba898b/",
  twitter: "https://twitter.com/jitmohan_dev"
};

export const skills = [
  { name: "Node.js", level: 95, icon: "🟢" },
  { name: "Express.js", level: 90, icon: "⚡" },
  { name: "Nest.js", level: 85, icon: "🐱" },
  { name: "REST APIs", level: 95, icon: "🔗" },
  { name: "Microservices", level: 85, icon: "🔧" },
  { name: "PostgreSQL", level: 88, icon: "🐘" },
  { name: "MySQL", level: 85, icon: "🗄️" },
  { name: "MongoDB", level: 82, icon: "🍃" },
  { name: "Docker", level: 80, icon: "🐳" },
  { name: "Jenkins", level: 75, icon: "🔨" },
  { name: "Git", level: 92, icon: "📝" },
  { name: "AWS", level: 78, icon: "☁️" },
  { name: "Postman", level: 85, icon: "📮" }
];

export const projects = [
  {
    id: 1,
    title: "V-Sync (Vendor Portal)",
    description: "A comprehensive vendor onboarding platform enabling vendors to register, verify, and offer services/products. Features role-based access control, dynamic workflows, and real-time notifications.",
    technologies: ["React.js", "Node.js", "Express.js", "Knex.js", "PostgreSQL"],
    githubUrl: "https://github.com/jit737/v-sync-vendor-portal",
    liveUrl: "https://v-sync.jitmohan.dev",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Sales and Marketing CRM",
    description: "CRM-based platform enabling product sales through social media and user campaigns with seamless server-client communication through RESTful APIs.",
    technologies: ["React.js", "Node.js", "Express.js", "Knex.js", "PostgreSQL"],
    githubUrl: "https://github.com/jit737/sales-marketing-crm",
    liveUrl: "https://crm.jitmohan.dev",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "Middleware Integration (Toyota-Boshoku)",
    description: "Designed middleware for seamless data integration between SAP and ERP systems with automated connection recovery and optimized server performance.",
    technologies: ["Node.js", "Express.js", "PostgreSQL", "SAP Integration"],
    githubUrl: "https://github.com/jit737/toyota-middleware",
    liveUrl: "https://middleware.jitmohan.dev",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Mobile App Backend (Acsen Agriscience)",
    description: "Centralized Node.js backend supporting 9 Android applications with real-time SAP integration, QR code scanning, and offline sync capabilities.",
    technologies: ["Node.js", "Express.js", "PostgreSQL", "SAP Integration", "Android"],
    githubUrl: "https://github.com/jit737/acsen-mobile-backend",
    liveUrl: "https://acsen-api.jitmohan.dev",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=500&h=300&fit=crop",
    featured: true
  },
  {
    id: 5,
    title: "Admin Web Portal",
    description: "Secure admin portal for managing user authentication, roles, permissions, and centralized control over mobile applications with enterprise-grade security.",
    technologies: ["React.js", "Node.js", "Express.js", "PostgreSQL", "RBAC"],
    githubUrl: "https://github.com/jit737/admin-web-portal",
    liveUrl: "https://admin.jitmohan.dev",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&h=300&fit=crop",
    featured: false
  }
];

export const experience = [
  {
    id: 1,
    title: "Senior Backend Developer",
    company: "TechCorp Solutions",
    duration: "2022 - Present",
    location: "San Francisco, CA",
    description: "Leading backend development for enterprise-level applications serving 100K+ users. Designed and implemented microservices architecture resulting in 40% improved performance.",
    achievements: [
      "Architected microservices system handling 1M+ requests/day",
      "Reduced API response time by 60% through optimization",
      "Mentored 3 junior developers and established coding standards"
    ]
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "StartupHub Inc.",
    duration: "2021 - 2022",
    location: "Remote",
    description: "Developed scalable REST APIs and database solutions for a fast-growing fintech startup. Implemented CI/CD pipelines and automated testing.",
    achievements: [
      "Built payment processing system handling $2M+ transactions",
      "Implemented automated testing reducing bugs by 50%",
      "Set up Docker containerization for seamless deployments"
    ]
  },
  {
    id: 3,
    title: "Junior Full Stack Developer",
    company: "WebSolutions Agency",
    duration: "2020 - 2021",
    location: "Austin, TX",
    description: "Started as full-stack developer working on client projects. Gradually specialized in backend development and API design.",
    achievements: [
      "Delivered 15+ client projects on time and within budget",
      "Learned Node.js ecosystem and modern backend practices",
      "Collaborated with frontend teams on API specifications"
    ]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    position: "CTO at TechCorp Solutions",
    content: "Alex is an exceptional backend developer who consistently delivers high-quality, scalable solutions. His expertise in Node.js and microservices has been invaluable to our team.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c1d1?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager at StartupHub",
    content: "Working with Alex was a game-changer for our platform. His ability to architect complex systems while maintaining clean, maintainable code is impressive.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }
];