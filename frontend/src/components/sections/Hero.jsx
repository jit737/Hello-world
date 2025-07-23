import React from 'react';
import { Download, Mail, Github, Linkedin } from 'lucide-react';
import { usePersonalInfo } from '../../hooks/useApi';
import { Button } from '../ui/button';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const Hero = () => {
  const { data: personalInfo, loading, error, refetch } = usePersonalInfo();

  const handleDownloadResume = () => {
    if (personalInfo?.resume_url) {
      window.open(personalInfo.resume_url, '_blank');
    } else {
      // Fallback for demo
      window.open('/resume.pdf', '_blank');
    }
  };

  const handleContactClick = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <LoadingSpinner size="xl" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ErrorMessage error={error} onRetry={refetch} />
      </section>
    );
  }

  if (!personalInfo) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <ErrorMessage error="Personal information not found" onRetry={refetch} />
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
        <div className="absolute inset-0 bg-dots-pattern animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent animate-fade-in">
                {personalInfo.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-blue-400 font-semibold mb-4 animate-fade-in-delay-1">
                {personalInfo.title}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl animate-fade-in-delay-2">
                {personalInfo.tagline}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in-delay-3">
              <Button 
                onClick={handleDownloadResume}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Download className="mr-2" size={20} />
                View Resume
              </Button>
              <Button 
                onClick={handleContactClick}
                variant="outline"
                className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="mr-2" size={20} />
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6 animate-fade-in-delay-4">
              <a 
                href={personalInfo.github_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a 
                href={personalInfo.linkedin_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Avatar/Animation */}
          <div className="flex justify-center lg:justify-end animate-fade-in-delay-2">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-1 animate-pulse-glow">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <div className="text-6xl animate-bounce-slow">👨‍💻</div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-400/20 rounded-full animate-float-delay"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;