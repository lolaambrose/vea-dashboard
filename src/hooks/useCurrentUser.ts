import { useEffect, useState } from 'react';
import { authService } from 'services/authService';
import { IUser } from 'types/users';

export const useCurrentUser = () => {
   const [user, setUser] = useState<IUser | null>(null);

   try {
      useEffect(() => {
         const currentUser = authService.getCurrentUser().then((user) => {
            if (user) {
               setUser(user);
            }
         });
      }, []);
   } catch (error) {
      throw new Error('Ошибка при получении текущего пользователя');
   }

   return user;
};
