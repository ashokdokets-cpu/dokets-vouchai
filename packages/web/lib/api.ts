import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' }
});

export const registerUser = (data: any) => api.post('/users/register', data);
export const getUser = (id: string) => api.get('/users/' + id);
export const getUserByPhone = (phone: string) => api.get('/users/phone/' + phone);
export const createContract = (data: any) => api.post('/contracts', data);
export const getContract = (id: string) => api.get('/contracts/' + id);
export const getUserContracts = (userId: string) => api.get('/contracts/user/' + userId);
export const acceptContract = (id: string) => api.post('/contracts/' + id + '/accept');
export const completeContract = (id: string) => api.post('/contracts/' + id + '/complete');
export const holdPayment = (data: any) => api.post('/payments/hold', data);
export const releasePayment = (data: any) => api.post('/payments/release', data);

export default api;