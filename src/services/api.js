import axios from 'axios';

const API_URL = 'https://surakshit-bot-detection-and-reporting.onrender.com/api';

export const api = {
  predict: async (screenName) => {
    try {
      const response = await axios.post(`${API_URL}/predict`, { screen_name: screenName });
      return response.data;
    } catch (error) {
      console.error('Error predicting user:', error);
      throw error;
    }
  },

  generateReport: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/generate-report`, { userData });
      return response.data;
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  },

  submitFeedback: async (feedbackData) => {
    try {
      const response = await axios.post(`${API_URL}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  }
}; 
