'use client';

import { HeaderButtons } from '@/components';
import { Menu01Icon, UserIcon } from '@/icons';
import { Sidebar } from '@/ui';
import { useState } from 'react';

export function Header() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className={'flex items-center justify-between'}>
      <h1 className={'text-3xl md:px-8'}>Kusodu.</h1>
      <div className={'hidden md:block'}>
        <HeaderButtons label={'Profile'} icon={<UserIcon />} href={'/auth'} />
      </div>
      <div className={'block md:hidden'}>
        <HeaderButtons
          label={'Profile'}
          icon={<Menu01Icon />}
          click={() => setOpenSidebar(true)}
        />
      </div>
      {openSidebar && (
        <div className={'block md:hidden'}>
          <Sidebar isMobile={true} close={() => setOpenSidebar(false)} />
        </div>
      )}
    </div>
  );
}
