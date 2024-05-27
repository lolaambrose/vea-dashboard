import Dropdown from 'components/dropdown';
import NavLink from 'components/link/NavLink';
import React, { useEffect } from 'react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
// import { RiMoonFill, RiSunFill } from 'react-icons/ri';
// import Configurator from './Configurator';
import Avatar from 'components/admin/profile/Avatar';
import { useUser } from 'contexts/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from 'services/authService';

const Navbar = (props: {
   onOpenSidenav: () => void;
   brandText: string;
   secondary?: boolean | string;
   [x: string]: any;
}) => {
   const { onOpenSidenav, brandText, mini, hovered } = props;
   const [darkmode, setDarkmode] = React.useState(document.body.classList.contains('dark'));
   const router = useRouter();
   const { user, loading } = useUser();

   useEffect(() => {
      if (!loading && !user) {
         router.push('/auth/sign-in');
      }
   }, [loading, user, router]);

   const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      authService.logout();
      router.push('/auth/sign-in');
   };

   if (loading) return <p>Loading...</p>;

   return (
      <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
         <div className="ml-[6px]">
            <div className="h-6 w-[224px] pt-1">
               <a
                  className="text-sm font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                  href=" "
               >
                  Pages
                  <span className="mx-1 text-sm text-navy-700 hover:text-navy-700 dark:text-white">
                     {' '}
                     /{' '}
                  </span>
               </a>
               <NavLink
                  className="text-sm font-normal capitalize text-navy-700 hover:underline dark:text-white dark:hover:text-white"
                  href="#"
               >
                  {brandText}
               </NavLink>
            </div>
            <p className="shrink text-[33px] capitalize text-navy-700 dark:text-white">
               <NavLink
                  href="#"
                  className="font-bold capitalize hover:text-navy-700 dark:hover:text-white"
               >
                  {brandText}
               </NavLink>
            </p>
         </div>

         <div className="relative mt-[3px] flex h-[61px] w-[100px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[125px] md:flex-grow-0 md:gap-1 xl:w-[125px] xl:gap-2">
            <div
               className="cursor-pointer text-gray-600"
               onClick={() => {
                  if (darkmode) {
                     document.body.classList.remove('dark');
                     setDarkmode(false);
                  } else {
                     document.body.classList.add('dark');
                     setDarkmode(true);
                  }
               }}
            >
               {darkmode ? (
                  <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
               ) : (
                  <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
               )}
            </div>
            {/* Profile & Dropdown */}
            <Dropdown
               button={
                  <div className="h-10 w-10 items-center justify-center rounded-full bg-pink-400 dark:!border-navy-700">
                     <Avatar username={user?.username} size="2xl" />
                  </div>
               }
               classNames={'py-2 top-8 -left-[180px] w-max'}
            >
               <div className="h-38 flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                  <div className="ml-4 mt-3">
                     <div className="flex items-center gap-2">
                        <p className="text-sm text-navy-700 dark:text-white">
                           👋 Hey, <b>{user ? user.username : 'User'}</b>
                        </p>{' '}
                     </div>
                  </div>
                  <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

                  <div className="ml-4 mt-3 flex flex-col">
                     <Link
                        href="/admin/profile"
                        className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                     >
                        Profile Settings
                     </Link>
                     <a
                        href=" "
                        className="mb-3 mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                        onClick={handleLogout}
                     >
                        Log Out
                     </a>
                  </div>
               </div>
            </Dropdown>
         </div>
      </nav>
   );
};

export default Navbar;
