'use client';
import Banner from 'components/admin/profile/Banner';
import Notification from 'components/admin/profile/Notification';

const ProfileOverview = () => {
   return (
      <div className="flex w-full flex-col gap-5 lg:gap-5">
         <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
            <div className="col-span-6 lg:!mb-0">
               <Banner />
            </div>
            <div className="col-span-3 lg:!mb-0">
               <Notification />
            </div>
         </div>
      </div>
   );
};

export default ProfileOverview;
