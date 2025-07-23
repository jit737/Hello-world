import React, { useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useProjects } from '../../hooks/useApi';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { data: allProjects, loading, error } = useProjects(false);
  const { data: featuredProjects } = useProjects(true);
  
  const filteredProjects = filter === 'all' 
    ? allProjects || []
    : filter === 'featured' 
    ? featuredProjects || []
    : allProjects || [];

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">Error loading projects: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my backend development work and technical expertise
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'featured', label: 'Featured' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  filter === tab.key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className="bg-gray-800/70 border-gray-700 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 group overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.is_featured && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Star size={12} className="mr-1" />
                    Featured
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary"
                      className="bg-blue-600/20 text-blue-400 border-blue-600/30 hover:bg-blue-600/30 transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 transition-all duration-200"
                    onClick={() => window.open(project.github_url, '_blank')}
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                    onClick={() => window.open(project.live_url, '_blank')}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-3 font-semibold transition-all duration-300"
            onClick={() => window.open('https://github.com/jit737', '_blank')}
          >
            <Github className="mr-2" size={20} />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;