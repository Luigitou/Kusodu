'use client';

import { useStore } from '@/_store';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Game } from '@/_ui/Game';

export default function Lobby() {
  const { id } = useParams();
  const grid = useStore(state => state.grid);

  const router = useRouter();

  useEffect(() => {
    if (!grid || grid.id !== id) {
      toast(`Aucune partie en cours avec id : ${id}`, {
        type: 'error',
      });
      router.push(`/`);
    }
  }, [grid, router, id]);

  return (
    <article>
      <Game />
    </article>
  );
}
