import axios from 'axios';

// Create Axios instance for API requests
const axiosInstance = axios.create({
  baseURL: 'https://geeky.bridgebrilliance.com/api', // Backend URL
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT token from localStorage
    'Content-Type': 'application/json',
  },
});
// const token = localStorage.getItem('token')
// console.log("token===>",token)
// Fetch engineers list
export const getEngineers = async () => {
  const response = await axiosInstance.get('/engineers');
  return response.data;
};
//fetch profile
export const getProfile = async () => {
  const response = await axiosInstance.get('/auth/profile');
  return response.data;
};
// Fetch a specific engineer's assignments
export const getEngineerAssignments = async (engineerId) => {
  const response = await axiosInstance.get(`/assignments/${engineerId}`);
  return response.data;
};

// Fetch specific engineer's capacity
export const getEngineerCapacity = async (engineerId) => {
  const response = await axiosInstance.get(`/engineers/${engineerId}/capacity`);
  return response.data;
};
//fetch all assignments
// Fetch specific engineer's capacity
export const getAssignments = async () => {
  const response = await axiosInstance.get(`/assignments`);
  return response.data;
};
// Fetch all projects
export const getProjects = async () => {
  const response = await axiosInstance.get('/projects');
  return response.data;
};

// Create a new project
export const createProject = async (projectData) => {
  const response = await axiosInstance.post('/projects', projectData);
  return response.data;
};

// Create an assignment
export const createAssignment = async (assignmentData) => {
  const response = await axiosInstance.post('/assignments', assignmentData);
  return response.data;
};

// Update an assignment
export const updateAssignment = async (assignmentId, updatedData) => {
  const response = await axiosInstance.put(`/assignments/${assignmentId}`, updatedData);
  return response.data;
};

// Delete an assignment
export const deleteAssignment = async (assignmentId) => {
  const response = await axiosInstance.delete(`/assignments/${assignmentId}`);
  return response.data;
};
