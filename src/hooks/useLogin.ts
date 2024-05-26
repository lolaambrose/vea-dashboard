import { authService } from '../services/authService';

export const useLogin = () => {
   const login = async (username: string, password: string) => {
      try {
         await authService.login(username, password);
      } catch (err) {
         throw new Error('Ошибка при логине');
      }
   };

   return { login };
};
