import React from 'react';
import { Code, Server, Database, Cloud } from 'lucide-react';
import { personalInfo } from '../../data/mock';
import { Card, CardContent } from '../ui/card';

const About = () => {
  const highlights = [
    {
      icon: <Server className="w-8 h-8 text-blue-400" />,
      title: "Backend Architecture",
      description: "Expert in designing scalable server-side systems and microservices"
    },
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: "API Development",
      description: "RESTful APIs and GraphQL with comprehensive documentation"
    },
    {
      icon: <Database className="w-8 h-8 text-blue-400" />,
      title: "Database Design",
      description: "Optimized database schemas and query performance tuning"
    },
    {
      icon: <Cloud className="w-8 h-8 text-blue-400" />,
      title: "Cloud Solutions",
      description: "AWS deployment, containerization, and CI/CD pipelines"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 p-1">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-3xl -z-10 blur-xl"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Building the Future, One API at a Time
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              <p className="text-gray-300 leading-relaxed">
                I thrive on solving complex problems and turning ideas into robust, production-ready applications. 
                My passion lies in creating efficient, maintainable code that scales with business growth.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 group">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center group-hover:animate-bounce">
                  {highlight.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">
                  {highlight.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;