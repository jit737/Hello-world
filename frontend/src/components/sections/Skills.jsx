import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { useSkills } from '../../hooks/useApi';

const Skills = () => {
  const { data: skills, loading, error } = useSkills();

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">Error loading skills: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {}) || {};

  const mainSkills = skills?.filter(skill => 
    ['backend', 'database', 'devops', 'cloud', 'tools'].includes(skill.category)
  ) || [];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to build robust backend systems
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {mainSkills.map((skill, index) => (
            <Card 
              key={skill.id} 
              className="bg-gray-800/50 border-gray-700 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl group-hover:animate-bounce">
                      {skill.icon}
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-blue-400 font-bold">
                    {skill.level}%
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Progress 
                    value={skill.level} 
                    className="w-full h-2 bg-gray-700"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skills Categories */}
        <div className="grid md:grid-cols-3 gap-8">
          {Object.keys(skillsByCategory).map((category) => (
            <div key={category} className="text-center">
              <h3 className="text-xl font-bold text-blue-400 mb-4 capitalize">
                {category === 'backend' ? 'Backend Frameworks' : 
                 category === 'database' ? 'Databases' : 
                 category === 'devops' ? 'DevOps & Tools' :
                 category === 'cloud' ? 'Cloud Services' :
                 category}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {skillsByCategory[category].map((skill) => (
                  <span 
                    key={skill.id} 
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-blue-400 transition-colors"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;