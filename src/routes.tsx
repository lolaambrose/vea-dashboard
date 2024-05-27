// Admin Imports

// Icon Imports
import { MdBarChart, MdHome, MdOutlineShoppingCart, MdPerson } from 'react-icons/md';

const routes = [
   {
      name: 'Home',
      layout: '/admin',
      path: 'default',
      icon: <MdHome className="h-6 w-6" />,
   },
   {
      name: 'NFT Marketplace',
      layout: '/admin',
      path: 'nft-marketplace',
      icon: <MdOutlineShoppingCart className="h-6 w-6" />,

      secondary: true,
   },
   {
      name: 'Data Tables',
      layout: '/admin',
      icon: <MdBarChart className="h-6 w-6" />,
      path: 'data-tables',
   },
   {
      name: 'Profile',
      layout: '/admin',
      path: 'profile',
      icon: <MdPerson className="h-6 w-6" />,
   },
];
export default routes;
