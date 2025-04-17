'use client';

import { FaRegCircleUser } from 'react-icons/fa6';
import LogoutBtn from './LogoutBtn';
import { useEffect, useState } from 'react';
import { UserT } from '@/lib/types';
import UserInfoSkeleton from '../skeletons/UserInfoSkeleton';

export default function UserInfo() {
  const [user, setUser] = useState<UserT>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className='flex items-center gap-8 text-white'>
      <FaRegCircleUser className='h-7 w-7 text-white' />

      <div className='flex flex-col gap-1'>
        {user == null ? (
          <UserInfoSkeleton />
        ) : (
          <>
            <p className='text-sm'>{`${user?.firstName} ${user?.lastName}`}</p>
            <p className='text-xs'>{user?.email}</p>
          </>
        )}
      </div>

      <LogoutBtn />
    </div>
  );
}
