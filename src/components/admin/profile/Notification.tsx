import Card from 'components/card';
import Switch from 'components/switch';

function Notification() {
   return (
      <Card extra={'w-full h-full p-4 px-6'}>
         <div className="relative mb-3 flex items-center justify-between pt-1">
            <h4 className="text-xl font-bold text-navy-700 dark:text-white">Уведомления</h4>
         </div>
         <div className="flex flex-col">
            <div className="mt-3 flex items-center gap-3">
               <Switch id="switch1" />
               <label
                  htmlFor="checkbox1"
                  className="text-base font-medium text-navy-700 dark:text-white"
               >
                  Telegram
               </label>
            </div>
         </div>
      </Card>
   );
}

export default Notification;
