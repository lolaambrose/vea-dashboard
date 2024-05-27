import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from 'services/authService';
import { IUser } from 'types/users';

interface UserContextType {
   user: IUser | null;
   loading: boolean;
}

const UserContext = createContext<UserContextType>({ user: null, loading: true });

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<IUser | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
         } catch (error) {
            console.error('Failed to fetch user', error);
         } finally {
            setLoading(false);
         }
      };

      fetchUser();
   }, []);

   return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
