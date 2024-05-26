import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { ILoginResponse } from 'types/responses';
import { IUser } from 'types/users';

export class AuthService {
   protected readonly instance: AxiosInstance;

   private refreshTokenTimeout: NodeJS.Timeout | null = null;

   constructor() {
      this.instance = axios.create({
         baseURL: process.env.NEXT_PUBLIC_API_URL,
         timeout: 30000,
         timeoutErrorMessage: 'Превышено время ожидания ответа от сервера',
      });
   }

   public async login(login: string, password: string) {
      if (!login || !password) {
         throw new Error('Требуется логин и пароль');
      }

      const response = await this.instance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
         login,
         password,
      });

      if (response.status !== 200) {
         throw new Error('Неверный логин или пароль');
      } else {
         const { token, refreshToken } = response.data;
         Cookies.set('token', token);
         Cookies.set('refreshToken', refreshToken);

         this.setRefreshTokenTimeout(refreshToken);

         return response.data as ILoginResponse;
      }
   }

   private setRefreshTokenTimeout(refreshToken: string) {
      if (this.refreshTokenTimeout) {
         clearTimeout(this.refreshTokenTimeout);
      }

      this.refreshTokenTimeout = setTimeout(() => {
         this.refreshToken(refreshToken);
      }, 14 * 60 * 1000); // 15 минут
   }

   private async refreshToken(refreshToken: string) {
      const response = await this.instance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
         refreshToken,
      });

      if (response.status === 200) {
         this.setRefreshTokenTimeout(response.data.refreshToken);
      } else {
         throw new Error('Не удалось обновить токен');
      }
   }

   public async getCurrentUser() {
      const response = await this.instance.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
         headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
         },
      });

      if (response.status === 200 && response.data && response.data.user) {
         return response.data.user as IUser;
      } else {
         throw new Error('Не удалось получить данные пользователя');
      }
   }

   public logout() {
      Cookies.remove('token');
      Cookies.remove('refreshToken');

      if (this.refreshTokenTimeout) {
         clearTimeout(this.refreshTokenTimeout);
      }
   }
}

export const authService = new AuthService();
