import API from './api';

export const login = (credentials) => API.post('/admin/login', credentials);
export const getDashboardStats = () => API.get('/admin/dashboard');
