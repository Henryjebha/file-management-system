import api from './api';

interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  // Django's JWT endpoint expects 'username' parameter
  const response = await api.post('/token/', { username, password });
  
  // Store tokens in localStorage
  localStorage.setItem('token', response.data.access);
  localStorage.setItem('refreshToken', response.data.refresh);
  
  return response.data;
};

export const register = async (username: string, email: string, password: string, password2: string): Promise<any> => {
  return await api.post('/register/', { username, email, password, password2 });
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const refreshToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token available');
  
  const response = await api.post('/token/refresh/', { refresh: refreshToken });
  localStorage.setItem('token', response.data.access);
  return response.data.access;
};