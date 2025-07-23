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
      <section id="projects" className="py-20 bg-gradient-to-br from-emerald-900/20 via-gray-800/50 to-gray-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-20 bg-gradient-to-br from-emerald-900/20 via-gray-800/50 to-gray-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">Error loading projects: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-emerald-900/20 via-gray-800/50 to-gray-900/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my backend development work and technical expertise
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-gray-800/50 p-1 rounded-lg backdrop-blur-sm border border-emerald-500/30">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'featured', label: 'Featured' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  filter === tab.key
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
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
              className="bg-gradient-to-br from-gray-800/70 to-emerald-900/20 border-emerald-500/30 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:transform hover:scale-105 group overflow-hidden backdrop-blur-sm"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {project.is_featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
                    <Star size={12} className="mr-1" />
                    Featured
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-100 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-4 line-clamp-3 group-hover:text-gray-300 transition-colors">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary"
                      className="bg-emerald-600/20 text-emerald-300 border-emerald-600/30 hover:bg-emerald-600/30 transition-colors backdrop-blur-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 transition-all duration-200"
                    onClick={() => window.open(project.github_url, '_blank')}
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white transition-all duration-200"
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
            className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105"
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