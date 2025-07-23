import { useState, useEffect } from 'react';

// Generic hook for API calls with loading and error states
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction();
        setData(result);
      } catch (err) {
        setError(err.message || 'An error occurred');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Hook for API mutations (POST, PUT, DELETE)
export const useApiMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (apiFunction) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
};

// Specific hooks for common API calls
export const usePersonalInfo = () => {
  const { personalInfoApi } = require('../services/api');
  return useApi(() => personalInfoApi.get());
};

export const useProjects = (featuredOnly = false) => {
  const { projectsApi } = require('../services/api');
  return useApi(() => projectsApi.getAll(featuredOnly), [featuredOnly]);
};

export const useExperience = () => {
  const { experienceApi } = require('../services/api');
  return useApi(() => experienceApi.getAll());
};

export const useSkills = (category = null) => {
  const { skillsApi } = require('../services/api');
  return useApi(() => skillsApi.getAll(category), [category]);
};

export const useStats = () => {
  const { statsApi } = require('../services/api');
  return useApi(() => statsApi.get());
};