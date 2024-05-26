'use client';
import Default from 'components/auth/variants/DefaultAuthLayout';
import InputField from 'components/fields/InputField';
import { useLogin } from 'hooks/useLogin';
import { useState } from 'react';

function SignInDefault() {
   const [error, setError] = useState('');
   const { login: performLogin } = useLogin();

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(e.currentTarget);
      const login = formData.get('login') as string;
      const password = formData.get('password') as string;

      try {
         await performLogin(login, password);
      } catch (error) {
         setError(error.message);
      }

      e.preventDefault();
   };

   return (
      <Default
         maincard={
            <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
               {/* Sign in section */}
               <form
                  className="mt-[10vh] w-full max-w-full flex-col items-center justify-center lg:pl-0 xl:max-w-[420px]"
                  onSubmit={handleSubmit}
               >
                  <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">Войти</h3>
                  <p className="mb-9 text-base text-gray-600">
                     Введите логин и пароль, чтобы войти
                  </p>

                  <InputField
                     variant="auth"
                     placeholder="Логин"
                     extra="mt-4"
                     id="login"
                     type="text"
                     name="login"
                  />

                  {/* Password */}
                  <InputField
                     variant="auth"
                     extra="mb-3 mt-4"
                     placeholder="Пароль"
                     id="password"
                     type="password"
                     name="password"
                  />

                  <button
                     type="submit"
                     className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                  >
                     Вход
                  </button>
               </form>
            </div>
         }
      />
   );
}

export default SignInDefault;
