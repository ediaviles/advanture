import axios from 'axios';

// Set the base URL of your NodeJS server
const API_BASE_URL = 'http://localhost:3001'; // Adjust the port if needed

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  // You can add more settings here like headers
});

// Function to get data from an endpoint
export const getIslandsFromUser = async (username) => {
  try {
    console.log("username: ", username)
    const response = await apiClient.get(`/islands/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to post data to an endpoint
export const saveIsland = async (data) => {
    console.log(data)
    try {
        const response = await apiClient.post('/save_island', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Add more functions for other API calls as needed
