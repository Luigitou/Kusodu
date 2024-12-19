'use client';

import { LinkCircle02Icon } from '@/_icons';
import { useState } from 'react';
import { useStore } from '@/_store';
import { useRouter } from 'next/navigation';

export const JoinGame = () => {
  const router = useRouter();
  const [joinRoomId, setJoinRoomId] = useState<string | null>(null);
  const joinGame = useStore(state => state.joinGame);

  const handleJoinRoom = async () => {
    if (joinRoomId) {
      const tryingToJoin = await joinGame(joinRoomId);
      if (tryingToJoin) {
        const { roomId } = tryingToJoin;
        setJoinRoomId(null);
        if (roomId) {
          router.push(`/lobby/${roomId}`);
        }
      }
    } else {
      return;
    }
  };

  return (
    <div
      className={
        'flex h-full w-full items-center justify-center rounded-xl border-2 border-transparent bg-light p-2 hover:border-primary'
      }
    >
      <input
        type={'text'}
        placeholder={'Entrez le code de la partie'}
        value={joinRoomId ? joinRoomId : ''}
        onChange={e => setJoinRoomId(e.target.value)}
        className={'w-fit bg-transparent text-white outline-none'}
      />
      <button
        className={'flex scale-90 items-center justify-center'}
        onClick={handleJoinRoom}
      >
        <LinkCircle02Icon />
      </button>
    </div>
  );
};
