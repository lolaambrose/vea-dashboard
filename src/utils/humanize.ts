export const humanizeRole = (role: string) => {
   switch (role) {
      case 'admin':
         return 'Администратор';
      case 'chatter':
         return 'Чаттер';
      default:
         return 'Пользователь';
   }
};
