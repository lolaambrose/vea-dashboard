import axios from 'axios';
import Cookies from 'js-cookie';
import { authService } from 'services/authService';

const apiClient = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   timeout: 30000,
   timeoutErrorMessage: 'Превышено время ожидания ответа от сервера',
});

apiClient.interceptors.request.use((config) => {
   const token = Cookies.get('token');
   console.log('Request token:', token); // Логирование токена перед каждым запросом
   if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
   }
   return config;
});

apiClient.interceptors.response.use(
   (response) => response,
   async (error) => {
      console.log('Interceptor error:', error);
      const originalRequest = error.config;

      if (!error.response) {
         console.error('Network error or no response received:', error);
         return Promise.reject(error);
      }

      console.log('error.response.status:', error.response.status);
      if (error.response.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true;
         const refreshToken = Cookies.get('refreshToken');
         console.log('Refresh token:', refreshToken); // Логирование refreshToken
         if (refreshToken) {
            try {
               console.log('Attempting to refresh token...');
               const response = await apiClient.post('/auth/refresh-token', { refreshToken });
               console.log('Refresh token response:', response); // Логирование ответа на обновление токена
               if (response.status === 200) {
                  console.log('Token refresh response:', response.data);
                  Cookies.set('token', response.data.token);
                  Cookies.set('refreshToken', response.data.refreshToken);
                  apiClient.defaults.headers.common[
                     'Authorization'
                  ] = `Bearer ${response.data.token}`;
                  originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
                  console.log('Token refreshed:', response.data.token); // Логирование обновленного токена
                  return apiClient(originalRequest);
               } else {
                  console.error('Failed to refresh token:', response.data);
                  authService.logout();
                  Cookies.remove('token');
                  Cookies.remove('refreshToken');
                  return Promise.reject(response.data);
               }
            } catch (refreshError) {
               console.error('Token refresh failed:', refreshError); // Логирование ошибки обновления токена
               authService.logout();
               Cookies.remove('token');
               Cookies.remove('refreshToken');
               return Promise.reject(refreshError);
            }
         } else {
            console.error('No refresh token available');
            authService.logout();
            return Promise.reject(error);
         }
      }
      return Promise.reject(error);
   },
);

export default apiClient;
