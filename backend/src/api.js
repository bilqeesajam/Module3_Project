import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:5000/api';

export default {
  // Get courses from backend
  getCourses() {
    return axios.get(`${API_URL}/courses`);
  },

  // Register a user
  registerUser(userData) {
    return axios.post(`${API_URL}/users/register`, userData);
  },

  // Create an order
  createOrder(orderData) {
    return axios.post(`${API_URL}/orders`, orderData);
  }
};
