import api from './api';
import { File, FileStats } from '../types/file.types';

export const getFiles = async (): Promise<File[]> => {
  const response = await api.get('/files/');
  return response.data;
};

export const getFile = async (id: number): Promise<File> => {
  const response = await api.get(`/files/${id}/`);
  return response.data;
};

export const uploadFile = async (fileData: FormData): Promise<File> => {
  const response = await api.post('/files/', fileData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteFile = async (id: number): Promise<void> => {
  await api.delete(`/files/${id}/`);
};

export const getFileStats = async (): Promise<FileStats> => {
  const response = await api.get('/files/dashboard_stats/');
  return response.data;
};