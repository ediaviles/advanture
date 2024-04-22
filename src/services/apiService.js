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

// Function to get islands from list of tags
export const getIslandsFromTags = async (data) => {
  console.log(data)
  try {
    const queryString = data.tags.join(',');
    const response = await apiClient.get(`/islands-by-tags?tags=${encodeURIComponent(queryString)}&username=${data.username}`);
    return response.data
  } catch (error) {
    throw error
  }
}

export const createUser = async (data) => {
  console.log(data)
  try {
    const response = await apiClient.post(`/create-user`, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const loginUser = async (data) => {
  console.log(data)
  try {
    const response = await apiClient.get(`/get-user/${data.username}/${data.password}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateFollowing = async (data) => {
  console.log('inupdateFollowing:', data)
  try {
    const response = await apiClient.put(`/update-following`, {
      username: data.username,
      following: data.following.join(',')
    })
    return response.data.following
  } catch (error) {
    throw error
  }
}

// Add more functions for other API calls as needed
