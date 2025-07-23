import React from 'react';
import { Code, Database, Cloud, Zap } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { usePersonalInfo, useStats } from '../../hooks/useApi';

const About = () => {
  const { data: personalInfo, loading: personalLoading } = usePersonalInfo();
  const { data: stats, loading: statsLoading } = useStats();

  if (personalLoading || statsLoading) {
    return (
      <section id="about" className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading about information...</p>
          </div>
        </div>
      </section>
    );
  }

  const highlights = [
    {
      icon: <Code className="w-8 h-8 text-emerald-400" />,
      title: 'Backend Excellence',
      description: 'Specialized in Node.js ecosystem with expertise in building scalable, robust server-side applications',
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30'
    },
    {
      icon: <Database className="w-8 h-8 text-teal-400" />,
      title: 'Database Design',
      description: 'Proficient in PostgreSQL, MySQL, and MongoDB with a focus on optimized query performance',
      color: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30'
    },
    {
      icon: <Cloud className="w-8 h-8 text-cyan-400" />,
      title: 'Cloud Architecture', 
      description: 'Experience with AWS services, Docker containerization, and microservices deployment',
      color: 'from-cyan-500/20 to-emerald-500/20 border-cyan-500/30'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'API Development',
      description: 'Expert in RESTful API design, real-time integrations, and system interoperability',
      color: 'from-yellow-500/20 to-emerald-500/20 border-yellow-500/30'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-800/30 via-gray-900/50 to-emerald-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate about building scalable backend systems and solving complex technical challenges
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Bio Section */}
          <div className="space-y-6">
            <div className="prose prose-lg text-gray-300 leading-relaxed">
              <p className="text-lg">
                {personalInfo?.bio || 'Loading biography...'}
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
                <div className="text-3xl font-bold text-emerald-400 mb-1">
                  {stats?.years_experience || '4+'}
                </div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-lg border border-teal-500/20">
                <div className="text-3xl font-bold text-teal-400 mb-1">
                  {stats?.total_projects || '5+'}
                </div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((highlight, index) => (
              <Card 
                key={highlight.title}
                className={`bg-gradient-to-br ${highlight.color} backdrop-blur-sm hover:scale-105 transition-all duration-300 group cursor-pointer`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {highlight.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-100 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technical Philosophy */}
        <div className="text-center bg-gradient-to-r from-emerald-900/20 via-gray-800/30 to-teal-900/20 rounded-2xl p-8 border border-emerald-500/20">
          <h3 className="text-2xl font-bold text-white mb-4">
            My Technical Philosophy
          </h3>
          <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-lg">
            I believe in writing clean, maintainable code that scales. Every backend system I build 
            prioritizes performance, security, and developer experience. My approach combines modern 
            technologies with proven architectural patterns to deliver robust solutions that grow with your business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;