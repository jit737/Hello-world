import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_BASE = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Personal Info API
export const personalInfoApi = {
  get: async () => {
    const response = await api.get('/personal-info');
    return response.data;
  },
  
  update: async (data) => {
    const response = await api.put('/personal-info', data);
    return response.data;
  }
};

// Projects API
export const projectsApi = {
  getAll: async (featuredOnly = false) => {
    const response = await api.get(`/projects?featured_only=${featuredOnly}`);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/projects', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  }
};

// Experience API
export const experienceApi = {
  getAll: async () => {
    const response = await api.get('/experience');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/experience/${id}`);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/experience', data);
    return response.data;
  }
};

// Skills API
export const skillsApi = {
  getAll: async (category = null) => {
    const url = category ? `/skills?category=${category}` : '/skills';
    const response = await api.get(url);
    return response.data;
  },
  
  create: async (data) => {
    const response = await api.post('/skills', data);
    return response.data;
  }
};

// Contact API
export const contactApi = {
  submit: async (data) => {
    const response = await api.post('/contact', data);
    return response.data;
  },
  
  getMessages: async (unreadOnly = false) => {
    const response = await api.get(`/contact-messages?unread_only=${unreadOnly}`);
    return response.data;
  },
  
  markAsRead: async (id) => {
    const response = await api.put(`/contact-messages/${id}/read`);
    return response.data;
  }
};

// Stats API
export const statsApi = {
  get: async () => {
    const response = await api.get('/stats');
    return response.data;
  }
};

// Health check
export const healthApi = {
  check: async () => {
    const response = await api.get('/');
    return response.data;
  }
};

export default api;