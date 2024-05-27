const Avatar = (props: { username: string; size: string }) => {
   const { username, size } = props;

   // Извлекаем первую букву имени пользователя
   const firstLetter = username.charAt(0).toUpperCase();

   return (
      <div
         className={`flex h-full w-full items-center justify-center rounded-full bg-blue-500 text-${size} font-bold uppercase text-white`}
      >
         {firstLetter}
      </div>
   );
};

export default Avatar;
