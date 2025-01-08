'use client';

import { useStore } from '@/_store';
import { Login, Register, Settings } from '@/_ui';
import { useState } from 'react';

export default function Auth() {
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const [switchToRegister, setSwitchToRegister] = useState(false);

  return (
    <div
      className={
        'flex w-full items-center justify-center gap-8 rounded-lg bg-dark p-12 md:w-fit'
      }
    >
      {isAuthenticated ? (
        <div className={'w-full'}>
          <Settings />
        </div>
      ) : (
        <div className={'w-full'}>
          {switchToRegister ? (
            <Register switchtoLogin={() => setSwitchToRegister(false)} />
          ) : (
            <Login switchToRegister={() => setSwitchToRegister(true)} />
          )}
        </div>
      )}
    </div>
  );
}
