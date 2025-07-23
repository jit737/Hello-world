import React from 'react';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { useExperience, useStats } from '../../hooks/useApi';

const Experience = () => {
  const { data: experience, loading, error } = useExperience();
  const { data: stats } = useStats();

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading experience...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">Error loading experience: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-900/50 via-gray-800/70 to-teal-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey in backend development and system architecture
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-400 via-teal-500 to-cyan-600 transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {experience?.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-4 border-gray-900 transform md:-translate-x-2 z-10 shadow-lg shadow-emerald-500/30">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <Card className="bg-gradient-to-br from-gray-800/70 to-emerald-900/20 border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:transform hover:scale-105 group backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-100 transition-colors mb-2">
                          {exp.title}
                        </h3>
                        <h4 className="text-lg font-semibold text-emerald-400 mb-2">
                          {exp.company}
                        </h4>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-teal-400" />
                            {exp.duration}
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2 text-cyan-400" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed group-hover:text-gray-200 transition-colors">
                        {exp.description}
                      </p>

                      <div className="space-y-2">
                        <h5 className="text-sm font-semibold text-emerald-400 mb-2">
                          Key Achievements:
                        </h5>
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start space-x-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                            <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Progression Stats */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg p-6 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300 backdrop-blur-sm">
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              {stats?.years_experience || '4+'}
            </div>
            <div className="text-gray-400">Years in Backend Development</div>
          </div>
          <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-lg p-6 border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300 backdrop-blur-sm">
            <div className="text-3xl font-bold text-teal-400 mb-2">
              {stats?.total_projects || '5+'}
            </div>
            <div className="text-gray-400">Major Projects Completed</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-lg p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm">
            <div className="text-3xl font-bold text-cyan-400 mb-2">50+</div>
            <div className="text-gray-400">APIs Developed</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;