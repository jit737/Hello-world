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
    title: "Software Engineer",
    company: "Current Company",
    duration: "2022 - Present",
    location: "Bangalore, India",
    description: "Leading backend development for enterprise-level applications and client projects. Specialized in Node.js ecosystem with expertise in microservices architecture and system integrations.",
    achievements: [
      "Developed V-Sync vendor portal serving 12-member cross-functional team",
      "Built CRM platform handling social media sales campaigns for 10-member team",
      "Architected middleware solutions for Toyota-Boshoku SAP-ERP integration"
    ]
  },
  {
    id: 2,
    title: "Backend Developer - Client Projects",
    company: "Acsen Agriscience",
    duration: "Aug 2023 - July 2024",
    location: "Remote",
    description: "Led development of 9 Java-based Android applications with centralized Node.js backend. Implemented real-time SAP integration and offline sync capabilities.",
    achievements: [
      "Deployed 9 Android apps supporting core business operations",
      "Built secure Admin Web Portal with RBAC and centralized control",
      "Engineered QR code scanning modules with high accuracy",
      "Enabled offline data capture for field operatives"
    ]
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Previous Projects",
    duration: "Jun 2022 - Mar 2023",
    location: "Bangalore, India",
    description: "Developed CRM-based platform and middleware solutions. Focused on RESTful API development and system integrations.",
    achievements: [
      "Created RESTful APIs for seamless client-server communication",
      "Enhanced user experience with React.js front-end development",
      "Optimized server performance through efficient API handling"
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