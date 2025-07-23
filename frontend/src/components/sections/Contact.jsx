import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../../hooks/use-toast';
import { usePersonalInfo } from '../../hooks/useApi';
import { contactApi } from '../../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Get personal info from API
  const { data: personalInfo, loading: personalInfoLoading } = usePersonalInfo();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await contactApi.submit(formData);
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default"
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (personalInfoLoading) {
    return (
      <section id="contact" className="py-20 bg-gradient-to-br from-emerald-900/20 via-gray-800/50 to-gray-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading contact information...</p>
          </div>
        </div>
      </section>
    );
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-emerald-400" />,
      label: "Email",
      value: personalInfo?.email || '',
      href: `mailto:${personalInfo?.email || ''}`
    },
    {
      icon: <Phone className="w-6 h-6 text-teal-400" />,
      label: "Phone",
      value: personalInfo?.phone || '',
      href: `tel:${personalInfo?.phone || ''}`
    },
    {
      icon: <MapPin className="w-6 h-6 text-cyan-400" />,
      label: "Location",
      value: personalInfo?.location || '',
      href: null
    }
  ];

  const socialPlatforms = [
    {
      name: 'GitHub',
      url: personalInfo?.github_url,
      icon: <Github className="w-6 h-6" />,
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      url: personalInfo?.linkedin_url,
      icon: <Linkedin className="w-6 h-6" />,
      color: 'hover:text-emerald-400'
    },
    {
      name: 'Twitter',
      url: personalInfo?.twitter_url,
      icon: <Twitter className="w-6 h-6" />,
      color: 'hover:text-cyan-400'
    }
  ].filter(platform => platform.url); // Only show platforms with URLs

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-emerald-900/20 via-gray-800/50 to-gray-900/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to discuss your next project? Let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's Start a Conversation
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you need a backend developer for your team or want to discuss 
                a potential collaboration, feel free to reach out.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="bg-gradient-to-br from-gray-800/70 to-emerald-900/30 p-3 rounded-lg group-hover:from-gray-700/70 group-hover:to-emerald-800/30 transition-all duration-300 border border-emerald-500/20 backdrop-blur-sm">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">{info.label}</div>
                    {info.href ? (
                      <a 
                        href={info.href}
                        className="text-white hover:text-emerald-400 transition-colors font-medium"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-white font-medium">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            {socialPlatforms.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialPlatforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-gradient-to-br from-gray-800/70 to-emerald-900/30 rounded-lg text-gray-400 ${platform.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/20 backdrop-blur-sm border border-emerald-500/20`}
                      title={platform.name}
                    >
                      {platform.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-gray-800/70 to-emerald-900/20 border-emerald-500/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-300 mb-2 block">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-emerald-500/30 text-white focus:border-emerald-400 focus:ring-emerald-400 backdrop-blur-sm"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2 block">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-700/50 border-emerald-500/30 text-white focus:border-emerald-400 focus:ring-emerald-400 backdrop-blur-sm"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300 mb-2 block">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-gray-700/50 border-emerald-500/30 text-white focus:border-emerald-400 focus:ring-emerald-400 backdrop-blur-sm"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-gray-300 mb-2 block">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="bg-gray-700/50 border-emerald-500/30 text-white focus:border-emerald-400 focus:ring-emerald-400 resize-none backdrop-blur-sm"
                    placeholder="Tell me about your project or how I can help you..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-emerald-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;