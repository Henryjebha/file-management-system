import api from './api';
import { User, Address, UserProfile } from '../types/user.types';

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get('/users/me/');
  return response.data;
};

export const updateUsername = async (username: string): Promise<User> => {
  const response = await api.patch('/users/update_username/', { username });
  return response.data;
};

export const updatePhoneNumber = async (phoneNumber: string): Promise<UserProfile> => {
  const response = await api.patch('/profiles/update_phone/', { phone_number: phoneNumber });
  return response.data;
};

export const getAddresses = async (): Promise<Address[]> => {
  const response = await api.get('/addresses/');
  return response.data;
};

export const createAddress = async (address: Omit<Address, 'id'>): Promise<Address> => {
  const response = await api.post('/addresses/', address);
  return response.data;
};

export const updateAddress = async (address: Address): Promise<Address> => {
  const response = await api.put(`/addresses/${address.id}/`, address);
  return response.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await api.delete(`/addresses/${id}/`);
};