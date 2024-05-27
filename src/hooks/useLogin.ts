import { authService } from '../services/authService';

export const useLogin = () => {
   const login = async (username: string, password: string) => {
      try {
         await authService.login(username, password);
         return true;
      } catch (err) {
         throw new Error('Ошибка при логине');
      }
   };

   return { login };
};
