import { authService } from 'services/authService';

export const useLogout = () => {
   const logout = async () => {
      try {
         await authService.logout();
      } catch (err) {
         throw new Error('Ошибка при выходе из аккаунта');
      }
   };

   return { logout };
};
