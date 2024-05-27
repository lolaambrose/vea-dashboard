import Cookies from 'js-cookie';
import { ILoginResponse } from 'types/responses';
import { IUser } from 'types/users';
import apiClient from '../utils/apiClient';

export class AuthService {
   public async login(login: string, password: string) {
      if (!login || !password) {
         throw new Error('Требуется логин и пароль');
      }

      const response = await apiClient.post('/auth/login', {
         username: login,
         password,
      });

      if (response.status !== 200) {
         throw new Error('Неверный логин или пароль');
      } else {
         const { token, refreshToken } = response.data;
         Cookies.set('token', token);
         Cookies.set('refreshToken', refreshToken);

         return response.data as ILoginResponse;
      }
   }

   public async getCurrentUser() {
      const response = await apiClient.get('/users/me');

      if (response.status === 200 && response.data && response.data.user) {
         return response.data.user as IUser;
      } else {
         throw new Error('Не удалось получить данные пользователя');
      }
   }

   public logout() {
      Cookies.remove('token');
      Cookies.remove('refreshToken');
   }
}

export const authService = new AuthService();
