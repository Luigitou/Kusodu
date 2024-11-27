'use client';

import { HeaderButtons } from '@/_components';
import { Menu01Icon, UserIcon } from '@/_icons';
import { useState } from 'react';
import { Sidebar } from '@/_ui';

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
