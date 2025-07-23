import React from 'react';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';
import { experience } from '../../data/mock';
import { Card, CardContent } from '../ui/card';

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Work Experience
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey in backend development and system architecture
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 transform md:-translate-x-0.5"></div>

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div 
                key={exp.id} 
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-gray-900 transform md:-translate-x-2 z-10">
                  <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <Card className="bg-gray-800/70 border-gray-700 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 group">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                          {exp.title}
                        </h3>
                        <h4 className="text-lg font-semibold text-blue-400 mb-2">
                          {exp.company}
                        </h4>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2" />
                            {exp.duration}
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="space-y-2">
                        <h5 className="text-sm font-semibold text-blue-400 mb-2">
                          Key Achievements:
                        </h5>
                        {exp.achievements.map((achievement, achIndex) => (
                          <div key={achIndex} className="flex items-start space-x-2 text-sm text-gray-400">
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
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl font-bold text-blue-400 mb-2">4+</div>
            <div className="text-gray-400">Years in Backend Development</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl font-bold text-blue-400 mb-2">3</div>
            <div className="text-gray-400">Companies Worked With</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <div className="text-3xl font-bold text-blue-400 mb-2">100K+</div>
            <div className="text-gray-400">Users Served by My Applications</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;